import { WordGroup } from "./wordGroup";
import { AudioType, PictureType, VideoType } from "./consts";
import { Language } from "./language";

export interface Level {
    // General information
    id: number;
    name: string;
    description: string;
    authorId: number;
    duration: number; // in seconds
    previewType: PictureType;
    tags: string[];
    language: Language;

    // Game information
    game: {
        audioType: AudioType;
        backgroundType: VideoType | PictureType;
        groups: WordGroup[]; // group groups to display in the game
    };
}
