import { action, observable, makeObservable, computed } from "mobx";
import { GameScore } from "./consts";

export class GameStatistics {
    private _score: number = 0;
    private _successfulLetters: number = 0;
    private typeSpeedSum: number = 0;
    private totalLetters: number = 0;
    private lastLetterTime: number | null = null;

    constructor() {
        makeObservable(this, {
            // @ts-ignore
            _score: observable,
            score: computed,
            reset: action,
            addInputResult: action,
        });
    }

    reset() {
        this._score = 0;
        this._successfulLetters = 0;
        this.typeSpeedSum = 0;
        this.totalLetters = 0;
        this.lastLetterTime = null;
    }

    get score(): number {
        return this._score;
    }

    get successfulLetters(): number {
        return this._successfulLetters;
    }

    get mistakenLetters(): number {
        return this.totalLetters - this.successfulLetters;
    }

    // accuracy from 0 to 100
    get accuracy(): number {
        if (this.totalLetters === 0) {
            return 0;
        }
        return (this.successfulLetters / this.totalLetters) * 100;
    }

    get averageSpeed(): number {
        if (this.totalLetters === 0) {
            return 0;
        }
        return this.typeSpeedSum / this.totalLetters;
    }

    // Add to statistics that letter was typed
    addInputResult(isRight: boolean, isEndOfGroup: boolean) {
        const currentTime = Date.now();
        if (this.lastLetterTime) {
            this.typeSpeedSum += currentTime - this.lastLetterTime;
        }
        this.lastLetterTime = isEndOfGroup ? null : currentTime;

        if (isRight) {
            this._successfulLetters++;
            this._score += GameScore.letter;
        }
        this.totalLetters++;
    }
}
