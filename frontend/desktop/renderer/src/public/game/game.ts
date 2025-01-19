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
    private isRunning: boolean = true;
    private currentTick: Tick = 0;

    constructor(level: Level) {
        makeObservable(this, {
            state: observable,
            start: action,
            tick: action,
        });

        this.level = level;
        for (let word of level.words) {
            this.state.addEvent(word.showTime, new AddWordEvent(word));
        }
    }

    async start() {
        this.isRunning = true;
        for (
            ;
            this.currentTick < this.level.duration && this.isRunning;
            this.currentTick++
        ) {
            const tickAwaited = wait(TICK_TIME);
            await this.tick();
            await tickAwaited;
        }

        if (this.currentTick == this.level.duration) {
            this.state.clearActiveWords();
        }
    }

    async tick() {
        const events = this.state.getEvents(this.currentTick);
        events?.forEach((event: GameEvent) => {
            event.run(this.state);
        });
    }

    stop(): void {
        this.isRunning = false;
    }
}
