export type PictureType = "png" | "jpeg" | "jpg";
export type VideoType = "mp4";
export type AudioType = "mp3";

export type Asset<T> = {
    type: T;
    url: string;
};

export const BACKGROUND_FILENAME = "background";
export const PREVIEW_FILENAME = "preview";
export const AUDIO_FILENAME = "audio";
