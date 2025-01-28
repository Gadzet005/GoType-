import { WordGroup } from "./wordGroup";
import { Asset, AudioType, PictureType, VideoType } from "./consts";
import { Language } from "./language";

export interface Level {
    // General information
    id: number;
    name: string;
    description: string;
    authorId: number;
    duration: number; // in seconds
    tags: string[];
    language: Language;
    preview: Asset<PictureType>;

    // Game information
    game: {
        audio: Asset<AudioType>;
        background: Asset<VideoType | PictureType>;
        groups: WordGroup[]; // group groups to display in the game
    };
}
