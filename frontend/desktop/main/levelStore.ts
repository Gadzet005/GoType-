import fs from "fs/promises";
import path from "path";
import { Level } from "../common/level";

export class LevelStore {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    getLevelPath(levelId: number): string {
        return path.join(this.path, String(levelId));
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
            JSON.stringify(level, null, 2)
        );
    }

    async getLevel(levelId: number): Promise<Level | null> {
        const levelPath = this.getLevelPath(levelId);
        try {
            const levelJson = await fs.readFile(
                path.join(levelPath, "level.json"),
                "utf8"
            );
            return JSON.parse(levelJson) as Level;
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
}
