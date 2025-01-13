import { Tick } from "@desktop-common/types";
import { GameEvent } from "./event";
import { Word } from "@desktop-common/word";

export class GameState {
    private _activeWords = new Map<number, Word>();
    private activeWordCounter = 0;
    private events = new Map<Tick, GameEvent[]>();

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

    get activeWords() {
        return this._activeWords;
    }
}
