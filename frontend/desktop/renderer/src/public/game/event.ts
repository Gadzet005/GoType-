import { WordGroup } from "@desktop-common/wordGroup";
import { GameState } from "./state";

export interface GameEvent {
    run(state: GameState): void;
}

export class RemoveWordGroupEvent implements GameEvent {
    private groupId: number;

    constructor(groupId: number) {
        this.groupId = groupId;
    }

    run(state: GameState) {
        state.words.removeGroup(this.groupId);
    }
}

export class AddWordGroupEvent implements GameEvent {
    private group: WordGroup;

    constructor(group: WordGroup) {
        console.assert(
            group.duration > 0 && group.showTime >= 0,
            "invalid group"
        );
        this.group = group;
    }

    run(state: GameState) {
        const groupId = state.words.addGroup(this.group);
        state.events.addEvent(
            this.group.showTime + this.group.duration,
            new RemoveWordGroupEvent(groupId)
        );
    }
}
