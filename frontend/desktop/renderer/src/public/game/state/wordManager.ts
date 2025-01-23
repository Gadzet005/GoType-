import { WordGroup, LetterState } from "@desktop-common/wordGroup";
import { action, makeObservable, observable } from "mobx";
import { ActiveWordGroup } from "../activeWordGroup";
import { isAlphabetIncludesLetter } from "@desktop-common/language";

export interface InputResult {
    letterResult: boolean;
    isEndOfGroup: boolean;
    isEndOfWord: boolean;
}

interface InputPosition {
    groupId: number;
    letterIdx: number;
}

export class WordManager {
    // position of user input
    private position?: InputPosition;

    private words = new Map<number, ActiveWordGroup>();
    private wordIdIncrement = 0;
    private readonly alphabet: string;

    constructor(alphabet: string) {
        makeObservable(this, {
            // @ts-ignore
            words: observable,
            position: observable,
            addGroup: action,
            removeGroup: action,
            reset: action,
            advancePosition: action,
        });

        this.alphabet = alphabet;
    }

    getAllGroups(): ActiveWordGroup[] {
        return Array.from(this.words.values());
    }

    getGroup(groupId: number): ActiveWordGroup | undefined {
        return this.words.get(groupId);
    }

    hasGroup(groupId: number): boolean {
        return this.words.has(groupId);
    }

    addGroup(group: WordGroup): number {
        console.assert(group.text.length !== 0, "group invalid");

        const groupId = this.wordIdIncrement++;
        const activeWord = {
            id: groupId,
            state: Array(group.text.length).fill(LetterState.default),
            ...group,
        };
        this.words.set(groupId, activeWord);

        if (this.position === undefined) {
            this.setPosition({ groupId, letterIdx: 0 });
        }
        return groupId;
    }

    removeGroup(groupId: number) {
        if (this.position && this.position.groupId <= groupId) {
            this.movePositionToWord(groupId + 1);
        }
        this.words.delete(groupId);
    }

    reset() {
        this.words.clear();
        this.position = undefined;
    }

    advancePosition(letter: string): InputResult | null {
        if (
            !this.position ||
            !isAlphabetIncludesLetter(this.alphabet, letter)
        ) {
            return null;
        }

        const { groupId, letterIdx } = this.position;
        const group = this.getGroup(groupId);
        if (!group) {
            return null;
        }

        let result: InputResult = {
            letterResult: false,
            isEndOfGroup: false,
            isEndOfWord: false,
        };

        const currentLetter = group.text[letterIdx];
        if (currentLetter.toLowerCase() === letter.toLowerCase()) {
            group.state[letterIdx] = LetterState.success;
            result.letterResult = true;
        } else {
            group.state[letterIdx] = LetterState.mistake;
            result.letterResult = false;
        }

        let nextLetterIdx = letterIdx + 1;
        if (
            nextLetterIdx < group.text.length &&
            !isAlphabetIncludesLetter(this.alphabet, group.text[nextLetterIdx])
        ) {
            result.isEndOfWord = true;
        }

        while (
            nextLetterIdx < group.text.length &&
            !isAlphabetIncludesLetter(this.alphabet, group.text[nextLetterIdx])
        ) {
            group.state[nextLetterIdx] = LetterState.success;
            nextLetterIdx++;
        }

        if (nextLetterIdx >= group.text.length) {
            this.movePositionToWord(this.position.groupId + 1);
            result.isEndOfGroup = true;
        } else {
            this.setPosition({
                groupId: this.position.groupId,
                letterIdx: nextLetterIdx,
            });
        }

        return result;
    }

    private setPosition(newPosition?: InputPosition) {
        this.position = newPosition;
        if (!newPosition) {
            return;
        }

        const group = this.getGroup(newPosition.groupId);
        if (group && group.text.length > newPosition.letterIdx) {
            group.state[newPosition.letterIdx] = LetterState.current;
        }
    }

    private movePositionToWord(newWordId: number) {
        if (this.position && this.hasGroup(newWordId)) {
            this.setPosition({ groupId: newWordId, letterIdx: 0 });
        } else {
            this.setPosition(undefined);
        }
    }
}
