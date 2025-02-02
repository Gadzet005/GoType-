import { Game } from "@/core/store/game";
import { createDummyLevel } from "./dummy/level";

test("Game.init", () => {
    const level = createDummyLevel([]);
    const game = new Game(level);
    game.init();

    expect(game.isFinished || game.isPaused || game.isRunning).toBe(false);
    expect(game.progress).toBe(0);
    expect(game.state.field.getAllSentences().length).toBe(0);
});

test("Game.running", () => {
    const level = createDummyLevel([]);
    const game = new Game(level);
    game.init();
    game.start();

    expect(game.isRunning).toBe(true);
});

test("Game.pause", () => {
    const level = createDummyLevel([]);
    const game = new Game(level);
    game.init();
    game.start();
    game.pause();

    expect(game.isPaused).toBe(true);
});

test("Game.finish", () => {
    const level = createDummyLevel([]);
    const game = new Game(level);
    game.init();
    game.start();
    game.finish();

    expect(game.isFinished).toBe(true);
    expect(game.state.field.getAllSentences().length).toBe(0);
});
