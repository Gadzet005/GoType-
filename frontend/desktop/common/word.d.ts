import { Tick, Percent } from "./types";

export interface WordTemplate {
    fontFamily: string;
    fontSize: number;
}

export interface Word {
    text: string;
    showTime: Tick;
    duration: Tick;
    template: WordTemplate;
    coord: {
        x: Percent;
        y: Percent;
    };
}
