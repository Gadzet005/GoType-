import { EventsManager } from "./eventManager";
import { ActiveWordsManager } from "./activeWordManager";
import { action, makeObservable, observable } from "mobx";

export class GameState {
    readonly events = new EventsManager();
    readonly activeWords = new ActiveWordsManager();

    constructor() {
        makeObservable(this, {
            events: observable,
            activeWords: observable,
            reset: action,
        });
    }

    reset() {
        this.events.clearAllEvents();
        this.activeWords.clearWords();
    }
}
