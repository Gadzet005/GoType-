import { Level } from "@desktop-common/level";
import { TICK_TIME } from "./consts";
import { Language } from "@desktop-common/language";

/* 
    eslint-disable 
    @typescript-eslint/no-empty-object-type,
    @typescript-eslint/no-unsafe-declaration-merging
*/
export interface GameLevel extends Level {}
export class GameLevel implements Level {
    readonly language: Language;

    constructor(level: Level) {
        Object.assign(this, level);
        this.language =
            Language.byCode(this.languageCode) || Language.byCode("eng")!;
    }

    get durationInTicks(): number {
        return Math.ceil((this.duration * 1000) / TICK_TIME);
    }
}
/* eslint-enable */
