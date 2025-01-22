import { Level } from "@desktop-common/level";
import { Tick } from "@desktop-common/types";
import { action, computed, makeObservable, observable } from "mobx";
import { TICK_TIME } from "./consts";
import { wait } from "@desktop-common/utils";
import { AddWordEvent, GameEvent } from "./event";
import { GameState } from "./state";
import { GameLevel } from "./level";
import { GameStatistics } from "./statistics";
import { AdvanceResult } from "./state/activeWordManager";

export class Game {
    readonly state = new GameState();
    readonly statistics = new GameStatistics();
    private level: GameLevel;

    private loopPromise?: Promise<void>;
    private shouldStop: boolean = false;
    private _currentTick: Tick = 0;

    constructor(level: Level) {
        makeObservable(this, {
            // @ts-ignore
            state: observable,
            // @ts-ignore
            _currentTick: observable,
            currentTick: computed,
            progress: computed,
            setCurrentTick: action,
            loop: action,
            run: action,
            onTick: action,
            setInitialState: action,
        });

        this.level = new GameLevel(level);
        this.setInitialState();
    }

    setInitialState() {
        this.state.reset();
        this._currentTick = 0;
        for (let word of this.level.game.words) {
            this.state.events.addEvent(word.showTime, new AddWordEvent(word));
        }
    }

    private async loop(): Promise<void> {
        for (
            ;
            this.currentTick < this.level.durationInTicks && !this.shouldStop;
            this.setCurrentTick(this.currentTick + 1)
        ) {
            const tickAwaited = wait(TICK_TIME);
            await this.onTick();
            await tickAwaited;
        }
    }

    async run(): Promise<void> {
        this.loopPromise = this.loop();
        await this.loopPromise;
        this.loopPromise = undefined;
    }

    async pause(): Promise<void> {
        this.shouldStop = true;
        await this.loopPromise;
        this.loopPromise = undefined;
        this.shouldStop = false;
    }

    async onTick() {
        const events = this.state.events.getEvents(this.currentTick);
        events?.forEach((event: GameEvent) => {
            event.run(this.state);
        });
    }

    get currentTick() {
        return this._currentTick;
    }

    private setCurrentTick(newTick: number) {
        this._currentTick = newTick;
    }

    get isRunning() {
        return this.loopPromise !== undefined;
    }

    // progress from 0 to 100
    get progress() {
        if (this.level.durationInTicks === 0) {
            return 100;
        }
        return (this.currentTick / this.level.durationInTicks) * 100;
    }

    onInput(letter: string): void {
        const result = this.state.activeWords.advancePosition(letter);
        if (result !== AdvanceResult.ignore) {
            this.statistics.addLetter(result === AdvanceResult.success);
        }

        // if there are no more words, then stop tracking
        // time speed (until next word appears)
        if (this.state.activeWords.position === undefined) {
            this.statistics.resetLastLetterTime();
        }
    }
}
