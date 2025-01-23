import { Level } from "@desktop-common/level";
import { Tick } from "@desktop-common/types";
import { action, computed, makeObservable, observable } from "mobx";
import { TICK_TIME } from "./consts";
import { AddWordEvent, GameEvent } from "./event";
import { GameLevel } from "./level";
import { GameState } from "./state";
import { AdvanceResult } from "./state/activeWordManager";
import { GameStatistics } from "./statistics";

export class Game {
    readonly state = new GameState();
    readonly statistics = new GameStatistics();
    private level: GameLevel;

    private _isRunning = false;
    private tickInterval: NodeJS.Timeout | null = null;
    private currentTick: Tick = 0;

    constructor(level: Level) {
        makeObservable(this, {
            state: observable,
            statistics: observable,
            // @ts-ignore
            currentTick: observable,
            // @ts-ignore
            _isRunning: observable,

            isRunning: computed,
            progress: computed,

            init: action,
            start: action,
            tick: action,
            pause: action,
            onInput: action,
        });

        this.level = new GameLevel(level);
        this.init();
    }

    // set initial game state
    init() {
        this.state.reset();
        this.statistics.reset();
        this.currentTick = 0;
        this._isRunning = false;
        this.tickInterval = null;
        for (let word of this.level.game.words) {
            this.state.events.addEvent(word.showTime, new AddWordEvent(word));
        }
    }

    private tick() {
        if (this.currentTick === this.level.durationInTicks) {
            this.state.activeWords.reset();
            this.pause();
            return;
        }

        const events = this.state.events.getEvents(this.currentTick);
        events?.forEach((event: GameEvent) => {
            event.run(this.state);
        });
        this.currentTick++;
    }

    // run game if it's not already running
    start() {
        if (this.isRunning) return;
        this._isRunning = true;

        this.tickInterval = setInterval(() => {
            this.tick();
        }, TICK_TIME);
    }

    // pause game if it's running
    pause() {
        if (!this.isRunning) return;
        if (this.tickInterval) {
            clearInterval(this.tickInterval);
        }
        this.tickInterval = null;
        this._isRunning = false;
    }

    get isRunning() {
        return this._isRunning;
    }

    // progress in percent
    get progress() {
        if (this.level.durationInTicks === 0) {
            return 100;
        }
        return (this.currentTick / this.level.durationInTicks) * 100;
    }

    // on user input
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
