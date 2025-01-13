import { Tick } from "./types";
import { Word } from "./word";

export interface Level {
    id: number;
    name: String;
    authorId: number;
    duration: Tick;
    words: Word[];
}
