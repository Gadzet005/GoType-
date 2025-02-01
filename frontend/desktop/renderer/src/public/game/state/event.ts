import { Sentence } from "@desktop-common/sentence";
import { GameState } from ".";

export interface GameEvent {
    run(state: GameState): void;
}

export class RemoveSentenceEvent implements GameEvent {
    run(state: GameState) {
        state.field.removeSentence();
    }
}

export class addSentenceEvent implements GameEvent {
    private sentence: Sentence;

    constructor(sentence: Sentence) {
        this.sentence = sentence;
    }

    run(state: GameState) {
        state.field.addSentence(this.sentence);
        state.events.addEvent(
            this.sentence.showTime + this.sentence.duration,
            new RemoveSentenceEvent()
        );
    }
}
