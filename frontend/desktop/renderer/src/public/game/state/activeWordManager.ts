import { Word } from "@desktop-common/word";
import { action, makeObservable, observable } from "mobx";
import { ActiveWord } from "../activeWord";
import { LetterState } from "@desktop-common/word";

enum AdvanceResult {
    success,
    mistake,
    ignore,
}

interface InputPosition {
    wordId: number;
    letterIdx: number;
}

export class ActiveWordsManager {
    // position of user input
    position?: InputPosition;

    private words = new Map<number, ActiveWord>();
    private wordIdIncrement = 0;

    constructor() {
        makeObservable(this, {
            // @ts-ignore
            words: observable,
            position: observable,
            addWord: action,
            removeWord: action,
            clearWords: action,
            advancePosition: action,
        });
    }

    getWords(): ActiveWord[] {
        return Array.from(this.words.values());
    }

    getWord(wordId: number): ActiveWord | undefined {
        return this.words.get(wordId);
    }

    hasWord(wordId: number): boolean {
        return this.words.has(wordId);
    }

    addWord(word: Word): number {
        console.assert(word.text.length !== 0, "word invalid");

        const wordId = this.wordIdIncrement++;
        const activeWord = {
            id: wordId,
            state: Array(word.text.length).fill(LetterState.default),
            ...word,
        };
        this.words.set(wordId, activeWord);

        if (this.position === undefined) {
            this.setPosition({ wordId, letterIdx: 0 });
        }
        return wordId;
    }

    removeWord(wordId: number) {
        if (this.position && this.position.wordId <= wordId) {
            this.movePositionToWord(wordId + 1);
        }
        this.words.delete(wordId);
    }

    clearWords() {
        this.words.clear();
    }

    advancePosition(letter: string): AdvanceResult {
        if (!this.position) {
            return AdvanceResult.ignore;
        }

        const { wordId, letterIdx } = this.position;
        const word = this.getWord(wordId);
        if (!word) {
            return AdvanceResult.ignore;
        }

        let advanceResult;
        const currentLetter = word.text[letterIdx];
        if (currentLetter === letter) {
            word.state[letterIdx] = LetterState.success;
            advanceResult = AdvanceResult.success;
        } else {
            word.state[letterIdx] = LetterState.mistake;
            advanceResult = AdvanceResult.mistake;
        }

        if (letterIdx + 1 === word.text.length) {
            this.movePositionToWord(this.position.wordId + 1);
        } else {
            this.setPosition({
                wordId: this.position.wordId,
                letterIdx: this.position.letterIdx + 1,
            });
        }

        return advanceResult;
    }

    private setPosition(newPosition?: InputPosition) {
        this.position = newPosition;
        if (!newPosition) {
            return;
        }

        const word = this.getWord(newPosition.wordId);
        if (word && word.text.length > newPosition.letterIdx) {
            word.state[newPosition.letterIdx] = LetterState.current;
        }
    }

    private movePositionToWord(newWordId: number) {
        if (this.position && this.hasWord(newWordId)) {
            this.setPosition({ wordId: newWordId, letterIdx: 0 });
        } else {
            this.setPosition(undefined);
        }
    }
}
