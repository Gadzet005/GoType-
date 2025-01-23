import { action, observable, makeObservable, computed } from "mobx";
import { GameScore } from "./consts";
import { InputResult } from "./state/wordManager";

export class GameStatistics {
    private _score: number = 0;
    private _successfulLetters: number = 0;
    private _successfulWords: number = 0;
    private typeSpeedSum: number = 0;
    private totalLetters: number = 0;
    private lastLetterTime: number | null = null;
    private lastWordSuccess = true;

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
        this._successfulWords = 0;
        this.lastWordSuccess = true;
        this.typeSpeedSum = 0;
        this.totalLetters = 0;
        this.lastLetterTime = null;
    }

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
        this._successfulWords = 0;
        this.lastWordSuccess = true;
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

    get successfulWords(): number {
        return this._successfulWords;
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
    addInputResult(result: InputResult) {
        const currentTime = Date.now();
        if (this.lastLetterTime) {
            this.typeSpeedSum += currentTime - this.lastLetterTime;
        }
        this.lastLetterTime = result.isEndOfGroup ? null : currentTime;

        if (result.letterResult) {
            this._successfulLetters++;
            this._score += GameScore.letter;
        }
        this.totalLetters++;

        this.lastWordSuccess = this.lastWordSuccess && result.letterResult;
        if (result.isEndOfWord) {
            if (this.lastWordSuccess) {
                this._successfulWords++;
                this._score += GameScore.word;
            }
            this.lastWordSuccess = true;
        }
    }
}
