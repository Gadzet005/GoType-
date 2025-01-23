import { Tick } from "@desktop-common/types";
import { GameEvent } from "../event";
import { action, makeObservable, observable } from "mobx";

export class EventManager {
    private events = new Map<Tick, GameEvent[]>();

    constructor() {
        makeObservable(this, {
            // @ts-ignore
            events: observable.shallow,
            addEvent: action,
            clearTickEvents: action,
            clearAllEvents: action,
        });
    }

    addEvent(tick: Tick, event: GameEvent) {
        let tickEvents = this.events.get(tick);
        if (tickEvents) {
            tickEvents.push(event);
        } else {
            this.events.set(tick, [event]);
        }
    }

    getEvents(tick: Tick) {
        return this.events.get(tick);
    }

    clearTickEvents(tick: Tick) {
        this.events.delete(tick);
    }

    clearAllEvents() {
        this.events.clear();
    }
}
