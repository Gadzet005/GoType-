import { Tick, Percent } from "./types";

export interface StyleClass {
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    color: string;
    bgcolor?: string;
    padding?: number;
}

export interface Word {
    text: string;
    showTime: Tick;
    duration: Tick;
    style: StyleClass;
    coord: {
        x: Percent;
        y: Percent;
    };
}
