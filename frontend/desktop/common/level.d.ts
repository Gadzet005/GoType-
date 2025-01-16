import { Tick } from "./types";
import { Word } from "./word";

export interface Level {
    id: number;
    name: string;
    description: string;
    authorId: number;
    duration: Tick;
    words: Word[];
}
