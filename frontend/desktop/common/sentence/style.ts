import { AnimationEasing, millisecond } from "../types";

export interface LetterStyle {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string;
    color?: string;
}

export interface FadeAnimation {
    duration: millisecond;
    letterDuration: millisecond;
    easing?: AnimationEasing;
}

export interface SentenceAnimations {
    fadeIn: FadeAnimation;
    fadeOut: FadeAnimation;
}

export interface SentenceStyle {
    padding?: number;
    bgcolor?: string;
    rotate?: number;
    borderRadius?: number;

    letter: {
        default: LetterStyle;
        current: LetterStyle; // override default style for current letter
        mistake: LetterStyle; // override default style for all letters with mistake
        success: LetterStyle; // override default style for all successful letters
    };

    animations: SentenceAnimations;
}
