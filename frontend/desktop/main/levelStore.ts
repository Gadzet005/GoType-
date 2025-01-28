import fs from "fs/promises";
import path from "path";
import url from "url";
import {
    AUDIO_FILENAME,
    AudioType,
    BACKGROUND_FILENAME,
    PictureType,
    PREVIEW_FILENAME,
    VideoType,
} from "../common/consts";
import { Language } from "../common/language";
import { Level } from "../common/level";
import { WordGroup } from "../common/wordGroup";

interface StoredLevel {
    id: number;
    name: string;
    description: string;
    authorId: number;
    duration: number;
    tags: string[];
    language: Language;
    previewType: PictureType;
    audioType: AudioType;
    backgroundType: VideoType | PictureType;
    groups: WordGroup[];
}

export class LevelStore {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    private getLevelPath(levelId: number): string {
        return path.join(this.path, String(levelId));
    }

    private getLevelAssetUrl(levelId: number, fileName: string): string {
        return url
            .format({
                pathname: path.join(String(levelId), fileName),
                protocol: "level-file:",
                slashes: true,
            })
            .toString();
    }

    private serialize(level: Level): StoredLevel {
        return {
            id: level.id,
            name: level.name,
            description: level.description,
            authorId: level.authorId,
            duration: level.duration,
            tags: level.tags,
            language: level.language,
            previewType: level.preview.type,
            audioType: level.game.audio.type,
            backgroundType: level.game.background.type,
            groups: level.game.groups,
        };
    }

    private deserialize(stored: StoredLevel): Level {
        return {
            id: stored.id,
            name: stored.name,
            description: stored.description,
            authorId: stored.authorId,
            duration: stored.duration,
            tags: stored.tags,
            language: stored.language,
            preview: {
                type: stored.previewType,
                url: this.getLevelAssetUrl(
                    stored.id,
                    PREVIEW_FILENAME + "." + stored.previewType
                ),
            },
            game: {
                audio: {
                    type: stored.audioType,
                    url: this.getLevelAssetUrl(
                        stored.id,
                        AUDIO_FILENAME + "." + stored.audioType
                    ),
                },
                background: {
                    type: stored.backgroundType,
                    url: this.getLevelAssetUrl(
                        stored.id,
                        BACKGROUND_FILENAME + "." + stored.backgroundType
                    ),
                },
                groups: stored.groups,
            },
        };
    }

    async createLevel(level: Level) {
        const levelPath = this.getLevelPath(level.id);
        await fs.mkdir(levelPath, { recursive: true }).catch((err) => {
            if (err.code !== "EEXIST") {
                throw err;
            }
        });

        await fs.writeFile(
            path.join(levelPath, "level.json"),
            JSON.stringify(this.serialize(level), null, 2)
        );
    }

    async getLevel(levelId: number): Promise<Level | null> {
        const levelPath = this.getLevelPath(levelId);
        try {
            const levelJson = await fs.readFile(
                path.join(levelPath, "level.json"),
                "utf8"
            );
            const storedLevel = JSON.parse(levelJson) as StoredLevel;
            return this.deserialize(storedLevel);
        } catch (err) {
            if (err.code === "ENOENT") {
                return null;
            }
            throw err;
        }
    }

    async removeLevel(levelId: number) {
        const levelPath = this.getLevelPath(levelId);
        await fs.rmdir(levelPath, { recursive: true });
    }

    getPath(): string {
        return this.path;
    }
}
