import { Word } from "@desktop-common/word";
import { GameState } from "./state";

export interface GameEvent {
    run(state: GameState): void;
}

export class RemoveWordEvent implements GameEvent {
    private wordId: number;

    constructor(wordId: number) {
        this.wordId = wordId;
    }

    run(state: GameState) {
        state.activeWords.removeWord(this.wordId);
    }
}

export class AddWordEvent implements GameEvent {
    private word: Word;

    constructor(word: Word) {
        console.assert(word.duration > 0 && word.showTime >= 0, "invalid word");
        this.word = word;
    }

    run(state: GameState) {
        const wordId = state.activeWords.addWord(this.word);
        state.events.addEvent(
            this.word.showTime + this.word.duration,
            new RemoveWordEvent(wordId)
        );
    }
}
