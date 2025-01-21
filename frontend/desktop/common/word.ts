import { Tick, Percent } from "./types";

export interface LetterStyle {
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    color: string;
}

export interface WordStyle {
    padding?: number;
    bgcolor?: string;
}

export enum LetterState {
    default,
    current,
    mistake,
    success,
}

export interface Word {
    text: string;
    showTime: Tick; // time for word to appear in ticks
    duration: Tick; // time for word to disappear in ticks
    style: {
        word: WordStyle;
        default: LetterStyle;
        current: Partial<LetterStyle>; // override default style for current letter
        mistake: Partial<LetterStyle>; // override default style for all letters with mistake
        success: Partial<LetterStyle>; // override default style for all success letters
    };
    coord: {
        // (0%, 0%)     = top left corner
        // (100%, 100%) = bottom right corner
        x: Percent;
        y: Percent;
    };
}
