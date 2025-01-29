import { Level } from "@desktop-common/level";
import { Tick } from "@desktop-common/types";
import { action, computed, makeObservable, observable } from "mobx";
import { TICK_TIME } from "./consts";
import { AddWordGroupEvent, GameEvent } from "./event";
import { GameLevel } from "./level";
import { GameState } from "./state";
import { GameStatistics } from "./statistics";

enum GameStatus {
    idle,
    running,
    paused,
    finished,
}

export class Game {
    readonly state;
    readonly statistics = new GameStatistics();
    readonly level: GameLevel;

    private status = GameStatus.idle;
    private tickInterval: NodeJS.Timeout | null = null;
    private currentTick: Tick = 0;

    constructor(level: Level) {
        makeObservable(this, {
            state: observable,
            statistics: observable,
            // @ts-ignore
            currentTick: observable,
            // @ts-ignore
            status: observable,

            progress: computed,
            isFinished: computed,
            isPaused: computed,
            isRunning: computed,

            init: action,
            start: action,
            tick: action,
            pause: action,
            onInput: action,
        });

        this.state = new GameState(level.language);
        this.level = new GameLevel(level);
        this.init();
    }

    // set initial game state
    init() {
        this.state.reset();
        this.statistics.reset();
        this.currentTick = 0;
        this.status = GameStatus.idle;
        this.tickInterval = null;
        for (let group of this.level.game.groups) {
            this.state.events.addEvent(
                group.showTime,
                new AddWordGroupEvent(group)
            );
        }
    }

    private tick() {
        if (this.currentTick === this.level.durationInTicks) {
            this.finish();
            return;
        }

        const events = this.state.events.getEvents(this.currentTick);
        events?.forEach((event: GameEvent) => {
            event.run(this.state);
        });
        this.currentTick++;
    }

    start() {
        if (this.isRunning) return;
        this.status = GameStatus.running;

        this.tickInterval = setInterval(() => {
            this.tick();
        }, TICK_TIME);
    }

    // stop ticks
    private stop() {
        if (this.tickInterval) {
            clearInterval(this.tickInterval);
        }
        this.tickInterval = null;
    }

    finish() {
        this.status = GameStatus.finished;
        this.state.words.reset();
        this.stop();
    }

    pause() {
        this.status = GameStatus.paused;
        this.stop();
    }

    get isRunning() {
        return this.status === GameStatus.running;
    }

    get isPaused() {
        return this.status === GameStatus.paused;
    }

    get isFinished() {
        return this.status === GameStatus.finished;
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
        const result = this.state.words.advancePosition(letter);
        if (!result) {
            return;
        }

        this.statistics.addInputResult(result);
    }
}
