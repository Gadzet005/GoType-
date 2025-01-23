import { action, observable, makeObservable } from "mobx";
import { LETTER_TYPED_SCORE } from "./consts";

export class GameStatistics {
    private _score: number = 0;
    private successLetters: number = 0;
    private typeSpeedSum: number = 0;
    private totalLetters: number = 0;
    private lastLetterTime?: number;

    constructor() {
        makeObservable(this, {
            // @ts-ignore
            _score: observable,
            // @ts-ignore
            successLetters: observable,
            // @ts-ignore
            typeSpeedSum: observable,
            // @ts-ignore
            totalLetters: observable,
            // @ts-ignore
            lastLetterTime: observable,

            reset: action,
            addLetter: action,
            resetLastLetterTime: action,
        });
    }

    reset() {
        this._score = 0;
        this.successLetters = 0;
        this.typeSpeedSum = 0;
        this.totalLetters = 0;
        this.lastLetterTime = undefined;
    }

    get score(): number {
        return this._score;
    }

    // accuracy from 0 to 100
    get accuracy(): number {
        if (this.totalLetters === 0) {
            return 0;
        }
        return (this.successLetters / this.totalLetters) * 100;
    }

    get averageSpeed(): number {
        if (this.totalLetters === 0) {
            return 0;
        }
        return this.typeSpeedSum / this.totalLetters;
    }

    // Add to statistics that letter was typed
    addLetter(success: boolean) {
        const currentTime = Date.now();
        if (this.lastLetterTime) {
            this.typeSpeedSum += currentTime - this.lastLetterTime;
        }
        this.lastLetterTime = currentTime;

        if (success) {
            this.successLetters++;
            this._score += LETTER_TYPED_SCORE;
        }
        this.totalLetters++;
    }

    resetLastLetterTime() {
        this.lastLetterTime = undefined;
    }
}
