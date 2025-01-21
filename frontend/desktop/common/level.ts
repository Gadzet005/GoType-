import { Word } from "./word";
import { AudioType, PictureType, VideoType } from "./consts";

export interface Level {
    // General information
    id: number;
    name: string;
    description: string;
    authorId: number;
    duration: number; // in seconds
    previewType: PictureType;
    tags: string[];

    // Game information
    game: {
        audioType: AudioType;
        backgroundType: VideoType | PictureType;
        words: Word[]; // words to display in the game
    };
}
