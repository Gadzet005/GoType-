import { Sentence } from "@desktop-common/sentence";
import { GameFieldSentence, LetterState } from "./sentence";
import { Queue } from "@datastructures-js/queue";
import { Language } from "@desktop-common/language";
import {
    action,
    computed,
    makeAutoObservable,
    makeObservable,
    observable,
} from "mobx";

export interface CursorMoveResult {
    isRight: boolean;
    isEndOfSentence: boolean;
}

export class GameField {
    private completeSentences = makeAutoObservable(
        new Queue<GameFieldSentence>()
    );
    private activeSentences = makeAutoObservable(
        new Queue<GameFieldSentence>()
    );
    private sentenceIdIncrement = 0;
    private readonly lang: Language;

    constructor(lang: Language) {
        makeObservable(this, {
            // @ts-ignore
            completeSentences: observable,
            activeSentences: observable,

            hasActiveSentences: computed,

            completeCurrentSentence: action,
            addSentence: action,
            removeSentence: action,
            removeAllSentences: action,
            moveCursor: action,
        });
        this.lang = lang;
    }

    get hasActiveSentences(): boolean {
        return !this.activeSentences.isEmpty();
    }

    getAllSentences(): GameFieldSentence[] {
        return this.completeSentences
            .toArray()
            .concat(this.activeSentences.toArray());
    }

    // get the first active sentence
    getCurrentSentence(): GameFieldSentence | null {
        return this.activeSentences.isEmpty()
            ? null
            : this.activeSentences.front();
    }

    // complete the first active sentence
    completeCurrentSentence(): void {
        if (!this.activeSentences.isEmpty()) {
            const sentence = this.activeSentences.pop();
            this.completeSentences.push(sentence);
        }
    }

    addSentence(sentence: Sentence): void {
        const sentenceId = this.sentenceIdIncrement++;
        this.activeSentences.push(new GameFieldSentence(sentenceId, sentence));
    }

    removeSentence(): void {
        if (!this.completeSentences.isEmpty()) {
            this.completeSentences.pop();
        } else if (!this.activeSentences.isEmpty()) {
            this.activeSentences.pop();
        }
    }

    removeAllSentences(): void {
        this.activeSentences.clear();
        this.completeSentences.clear();
    }

    // seek the first letter in the alphabet
    private skipNoAlphabetLetters() {
        let sentence;
        while ((sentence = this.getCurrentSentence())) {
            if (sentence.length === 0) {
                this.completeCurrentSentence();
                continue;
            }
            if (!sentence.cursor.isInited) {
                sentence.cursor.move();
            }

            while (
                !sentence.cursor.isOnEnd &&
                !this.lang.includes(sentence.cursorLetter)
            ) {
                sentence.setLetterState(
                    sentence.cursor.position,
                    LetterState.success
                );
                sentence.cursor.move();
            }

            if (sentence.cursor.isOnEnd) {
                this.completeCurrentSentence();
            } else {
                break;
            }
        }
    }

    moveCursor(letter: string): CursorMoveResult | null {
        if (!this.hasActiveSentences || !this.lang.includes(letter)) {
            return null;
        }

        this.skipNoAlphabetLetters();

        const sentence = this.getCurrentSentence()!;

        const result: CursorMoveResult = {
            isRight:
                sentence.cursorLetter.toLowerCase() === letter.toLowerCase(),
            isEndOfSentence: false,
        };

        if (result.isRight) {
            sentence.setLetterState(
                sentence.cursor.position,
                LetterState.success
            );
        } else {
            sentence.setLetterState(
                sentence.cursor.position,
                LetterState.mistake
            );
        }

        sentence.cursor.move();
        this.skipNoAlphabetLetters();

        result.isEndOfSentence = sentence.cursor.isOnEnd;

        return result;
    }
}
