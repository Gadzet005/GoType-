import { GameState } from "@/core/store/game/state";
import { Language } from "@desktop-common/language";
import { createDummySentence } from "../dummy/sentence";

const eng = Language.byCode("eng")!;

test("GameState.init", () => {
    const gameState = new GameState(eng);
    gameState.init([
        createDummySentence("world", 0),
        createDummySentence("hello", 1000),
    ]);

    expect(gameState.field.getAllSentences().length).toBe(0);
    expect(gameState.events.getEvents(0).length).toBe(1);
    expect(gameState.events.getEvents(1000).length).toBe(1);
});
