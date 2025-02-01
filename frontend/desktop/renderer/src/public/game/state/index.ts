import { EventStorage } from "./eventStorage";
import { GameField } from "./field";
import { action, makeObservable, observable } from "mobx";
import { Language } from "@desktop-common/language";
import { Sentence } from "@desktop-common/sentence";
import { addSentenceEvent } from "./event";

export class GameState {
    readonly events = new EventStorage();
    readonly field: GameField;

    constructor(lang: Language) {
        makeObservable(this, {
            field: observable,
            events: observable,
            init: action,
        });
        this.field = new GameField(lang);
    }

    init(sentences: Sentence[]) {
        this.events.removeAllEvents();
        this.field.removeAllSentences();
        sentences.forEach((sentence) => {
            this.events.addEvent(
                sentence.showTime,
                new addSentenceEvent(sentence)
            );
        });
    }
}
