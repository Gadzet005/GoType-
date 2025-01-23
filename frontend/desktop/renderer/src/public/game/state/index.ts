import { EventManager } from "./eventManager";
import { WordManager } from "./wordManager";
import { action, makeObservable, observable } from "mobx";
import { Language, getLanguageInfo } from "@desktop-common/language";

export class GameState {
    readonly events = new EventManager();
    readonly words;

    constructor(language: Language) {
        makeObservable(this, {
            events: observable,
            words: observable,
            reset: action,
        });

        const languageInfo =
            getLanguageInfo(language) || getLanguageInfo("eng")!;
        this.words = new WordManager(languageInfo.alphabet);
    }

    reset() {
        this.events.clearAllEvents();
        this.words.reset();
    }
}
