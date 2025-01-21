import { Level } from "@desktop-common/level";
import { Tick } from "@desktop-common/types";
import { action, makeObservable, observable } from "mobx";
import { TICK_TIME } from "./consts";
import { wait } from "@desktop-common/utils";
import { AddWordEvent, GameEvent } from "./event";
import { GameState } from "./state";
import { GameLevel } from "./level";

export class Game {
    readonly state = new GameState();
    private level: GameLevel;

    private loopPromise?: Promise<void>;
    private shouldStop: boolean = false;
    private _currentTick: Tick = 0;
    private gameEndCallback?: () => void;

    constructor(level: Level, gameEndCallback?: () => void) {
        makeObservable(this, {
            // @ts-ignore
            state: observable,
            run: action,
            onTick: action,
            setInitialState: action,
        });

        this.gameEndCallback = gameEndCallback;
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
            this._currentTick < this.level.durationInTicks && !this.shouldStop;
            this._currentTick++
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
        if (
            this.currentTick == this.level.durationInTicks &&
            this.gameEndCallback
        ) {
            this.gameEndCallback();
        }
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

    get isRunning() {
        return this.loopPromise !== undefined;
    }

    onInput(letter: string): boolean {
        return this.state.activeWords.advancePosition(letter);
    }
}
