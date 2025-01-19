import { Tick } from "@desktop-common/types";
import { GameEvent } from "./event";
import { Word } from "@desktop-common/word";
import { action, computed, makeObservable, observable } from "mobx";

type ActiveWord = Word & { id: number };

export class GameState {
    _activeWords = new Map<number, Word>();
    private activeWordCounter = 0;
    private events = new Map<Tick, GameEvent[]>();

    constructor() {
        makeObservable(this, {
            _activeWords: observable,
            activeWords: computed,
            addWord: action,
            removeWord: action,
            clearActiveWords: action,
        });
    }

    addEvent(tick: Tick, event: GameEvent) {
        if (this.events.get(tick)) {
            this.events.get(tick)!.push(event);
        } else {
            this.events.set(tick, [event]);
        }
    }

    clearEvents(tick: Tick) {
        this.events.delete(tick);
    }

    getEvents(tick: Tick) {
        return this.events.get(tick);
    }

    addWord(word: Word): number {
        const wordId = this.activeWordCounter++;
        this._activeWords.set(wordId, word);
        return wordId;
    }

    removeWord(wordId: number) {
        this._activeWords.delete(wordId);
    }

    clearActiveWords() {
        this._activeWords.clear();
        this.activeWordCounter = 0;
    }

    get activeWords(): ActiveWord[] {
        let result: ActiveWord[] = [];
        this._activeWords.forEach((word, id) => {
            result.push({ id, ...word });
        });
        return result;
    }
}
