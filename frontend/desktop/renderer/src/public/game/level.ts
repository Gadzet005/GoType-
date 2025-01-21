import { Level } from "@desktop-common/level";
import { Word } from "@desktop-common/word";
import { TICK_TIME } from "./consts";
import {
    AUDIO_FILENAME,
    PREVIEW_FILENAME,
    BACKGROUND_FILENAME,
    AudioType,
    PictureType,
    VideoType,
} from "@desktop-common/consts";

export class GameLevel implements Level {
    id: number;
    name: string;
    description: string;
    authorId: number;
    duration: number;
    previewType: PictureType;
    tags: string[];
    game: {
        audioType: AudioType;
        backgroundType: VideoType | PictureType;
        words: Word[];
    };

    constructor(level: Level) {
        this.id = level.id;
        this.name = level.name;
        this.description = level.description;
        this.authorId = level.authorId;
        this.duration = level.duration;
        this.previewType = level.previewType;
        this.tags = level.tags;
        this.game = level.game;
    }

    get durationInTicks() {
        return Math.ceil((this.duration * 1000) / TICK_TIME);
    }

    get previewPath() {
        return PREVIEW_FILENAME + "." + this.previewType;
    }

    get backgroundPath() {
        return BACKGROUND_FILENAME + "." + this.game.backgroundType;
    }

    get audioPath() {
        return AUDIO_FILENAME + "." + this.game.audioType;
    }
}
