import { LanguageCode } from "./language";
import { Sentence } from "./sentence";
import { Asset, AudioType, PictureType, second, VideoType } from "./types";

export interface GeneralLevelInfo {
    id: number;
    name: string;
    description: string;
    author: {
        id: number;
        name: string;
    };
    duration: second;
    tags: string[];
    languageCode: LanguageCode;
    preview: Asset<PictureType>;
}

export interface GameLevelInfo {
    audio: Asset<AudioType>;
    background: Asset<VideoType | PictureType>;
    sentences: Sentence[]; // sentences to display in the game
}

export interface Level extends GeneralLevelInfo {
    game: GameLevelInfo;
}
