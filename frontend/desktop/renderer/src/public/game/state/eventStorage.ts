import { tick } from "@desktop-common/types";
import { GameEvent } from "./event";
import { action, makeObservable, observable } from "mobx";

export class EventStorage {
    private events = new Map<tick, GameEvent[]>();

    constructor() {
        makeObservable(this, {
            // @ts-ignore
            events: observable.shallow,
            addEvent: action,
            removeTickEvents: action,
            removeAllEvents: action,
        });
    }

    addEvent(tick: tick, event: GameEvent) {
        let tickEvents = this.events.get(tick);
        if (tickEvents) {
            tickEvents.push(event);
        } else {
            this.events.set(tick, [event]);
        }
    }

    getEvents(tick: tick): GameEvent[] {
        return this.events.get(tick) || [];
    }

    removeTickEvents(tick: tick) {
        this.events.delete(tick);
    }

    removeAllEvents() {
        this.events.clear();
    }
}
