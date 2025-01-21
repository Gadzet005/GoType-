import { Word, LetterState } from "./word";

export function wait(delay: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

export function getLetterStyle(word: Word, state: LetterState) {
    switch (state) {
        case LetterState.default:
            return word.style.default;
        case LetterState.current:
            return { ...word.style.default, ...word.style.current };
        case LetterState.mistake:
            return { ...word.style.default, ...word.style.mistake };
        case LetterState.success:
            return { ...word.style.default, ...word.style.success };
    }
}
