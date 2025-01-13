import { Level } from "@desktop-common/level";
import { Tick } from "@desktop-common/types";
import { action, makeObservable, observable } from "mobx";
import { TICK_TIME } from "./consts";
import { wait } from "./utils";
import { AddWordEvent, GameEvent } from "./event";
import { GameState } from "./state";

export class Game {
    state = new GameState();
    level: Level;

    constructor(level: Level) {
        makeObservable(this, {
            state: observable,
            tick: action,
        });

        this.level = level;
        for (let word of level.words) {
            this.state.addEvent(word.showTime, new AddWordEvent(word));
        }
    }

    async start() {
        for (
            let currentTick = 0;
            currentTick < this.level.duration;
            currentTick++
        ) {
            const tickAwaited = wait(TICK_TIME);
            await this.tick(currentTick);
            await tickAwaited;
        }
    }

    async tick(currentTick: Tick) {
        const events = this.state.getEvents(currentTick);
        events?.forEach((event: GameEvent) => {
            event.run(this.state);
        });
    }

    stop(): void {}
}
