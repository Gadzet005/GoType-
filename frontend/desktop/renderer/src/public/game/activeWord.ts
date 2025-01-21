import { LetterState, Word } from "@desktop-common/word";

export interface ActiveWord extends Word {
    id: number;
    state: LetterState[];
}
