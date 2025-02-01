import { expect, test } from "vitest";
import { createExampleSentence } from "./exampleSentence";
import { GameField } from "@/public/game/state/field";
import { Language } from "@desktop-common/language";

const engLang = Language.byCode("eng")!;

test("GameField.addSentence", () => {
    const field = new GameField(engLang);
    const sentence1 = createExampleSentence("foo");
    const sentence2 = createExampleSentence("bar");

    expect(field.hasActiveSentences).toBe(false);
    expect(field.getAllSentences().length).toBe(0);
    expect(field.getCurrentSentence()).toBeNull();

    field.addSentence(sentence1);

    expect(field.hasActiveSentences).toBe(true);
    expect(field.getAllSentences().length).toBe(1);
    expect(field.getCurrentSentence()?.content).toEqual(sentence1.content);

    field.addSentence(sentence2);

    expect(field.getCurrentSentence()!.content).toEqual(sentence1.content);
    expect(field.getAllSentences().length).toBe(2);
});

test("GameField.removeSentence", () => {
    const field = new GameField(engLang);
    const sentence1 = createExampleSentence("foo");
    const sentence2 = createExampleSentence("bar");

    field.addSentence(sentence1);
    field.addSentence(sentence2);

    expect(field.getAllSentences().length).toBe(2);

    field.removeSentence();

    expect(field.getAllSentences().length).toBe(1);
    expect(field.getCurrentSentence()?.content).toEqual(sentence2.content);

    field.removeSentence();

    expect(field.getAllSentences().length).toBe(0);
});

test("GameField.removeAllSentences", () => {
    const field = new GameField(engLang);
    const sentence1 = createExampleSentence("foo");
    const sentence2 = createExampleSentence("bar");

    field.addSentence(sentence1);
    field.addSentence(sentence2);
    field.completeCurrentSentence();
    field.removeAllSentences();

    expect(field.getAllSentences().length).toBe(0);
});

test("GameField.completeCurrentSentence", () => {
    const field = new GameField(engLang);
    const sentence = createExampleSentence("foo");

    field.addSentence(sentence);
    field.completeCurrentSentence();

    expect(field.getAllSentences().length).toBe(1);
    expect(field.hasActiveSentences).toBe(false);
});

test("GameField.moveCursor 1", () => {
    const field = new GameField(engLang);
    const sentence1 = createExampleSentence("foo");
    const sentence2 = createExampleSentence("bar");

    field.addSentence(sentence1);
    field.addSentence(sentence2);

    expect(field.moveCursor("f")).toEqual({
        isRight: true,
        isEndOfSentence: false,
    });
    expect(field.moveCursor("f")).toEqual({
        isRight: false,
        isEndOfSentence: false,
    });
    expect(field.moveCursor("o")).toEqual({
        isRight: true,
        isEndOfSentence: true,
    });
    expect(field.getCurrentSentence()?.content).equal(sentence2.content);
    expect(field.moveCursor("p")).toEqual({
        isRight: false,
        isEndOfSentence: false,
    });
    expect(field.moveCursor("a")).toEqual({
        isRight: true,
        isEndOfSentence: false,
    });
    expect(field.moveCursor("r")).toEqual({
        isRight: true,
        isEndOfSentence: true,
    });
    expect(field.getCurrentSentence()).toBeNull();
    expect(field.hasActiveSentences).toBe(false);
});

test("GameField.moveCursor 2", () => {
    const field = new GameField(engLang);
    const sentence1 = createExampleSentence("!?!f!o.!.o!...!");
    field.addSentence(sentence1);

    expect(field.moveCursor("!")).toEqual(null);
    expect(field.moveCursor("f")).toEqual({
        isRight: true,
        isEndOfSentence: false,
    });
    expect(field.moveCursor("!")).toEqual(null);
    expect(field.moveCursor("p")).toEqual({
        isRight: false,
        isEndOfSentence: false,
    });
    expect(field.moveCursor(".")).toEqual(null);
    expect(field.moveCursor("!")).toEqual(null);
    expect(field.moveCursor("o")).toEqual({
        isRight: true,
        isEndOfSentence: true,
    });
    expect(field.getCurrentSentence()).toBeNull();
});
