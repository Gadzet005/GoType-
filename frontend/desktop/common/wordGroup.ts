import { Tick, Percent } from "./types";

export interface LetterStyle {
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    color: string;
}

export interface WordGroupStyle {
    padding?: number;
    bgcolor?: string;
    rotate?: number;
}

export enum LetterState {
    default,
    current,
    mistake,
    success,
}

export interface WordGroup {
    text: string; // words (space is delimiter)
    showTime: Tick; // time for group to appear in ticks
    duration: Tick; // time for group to disappear in ticks
    style: {
        group: WordGroupStyle;
        default: LetterStyle;
        current: Partial<LetterStyle>; // override default style for current letter
        mistake: Partial<LetterStyle>; // override default style for all letters with mistake
        success: Partial<LetterStyle>; // override default style for all successful letters
    };
    coord: {
        // (0%, 0%)     = top left corner
        // (100%, 100%) = bottom right corner
        x: Percent;
        y: Percent;
    };
}
