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

// Level folder:
// level.json
// preview.png
// background.mp4
// audio.mp3

// type VideoType = "mp4";
// type PictureType = "png" | "jpeg" | "jpg";

// export interface Level {
//     // General information
//     id: number;
//     name: string;
//     description: string;
//     authorId: number;
//     duration: number; // in seconds
//     previewType: PictureType;
//     tags: string[];

//     // Game information
//     game: {
//         backgroundType: VideoType | PictureType;
//         words: Word[]; // words to display in the game
//     };
// }
