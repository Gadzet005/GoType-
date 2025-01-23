import { WordGroup, LetterState } from "./wordGroup";

export function getLetterStyle(group: WordGroup, state: LetterState) {
    switch (state) {
        case LetterState.default:
            return group.style.default;
        case LetterState.current:
            return { ...group.style.default, ...group.style.current };
        case LetterState.mistake:
            return { ...group.style.default, ...group.style.mistake };
        case LetterState.success:
            return { ...group.style.default, ...group.style.success };
    }
}
