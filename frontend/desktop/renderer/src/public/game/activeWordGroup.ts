import { LetterState, WordGroup } from "@desktop-common/wordGroup";

export interface ActiveWordGroup extends WordGroup {
    id: number;
    state: LetterState[];
}
