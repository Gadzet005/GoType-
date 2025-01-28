import { Level } from "@desktop-common/level";
import { TICK_TIME } from "./consts";

export class GameLevel implements Level {
    id: Level["id"];
    name: Level["name"];
    description: Level["description"];
    authorId: Level["authorId"];
    duration: Level["duration"];
    preview: Level["preview"];
    tags: Level["tags"];
    language: Level["language"];
    game: Level["game"];

    constructor(level: Level) {
        this.id = level.id;
        this.name = level.name;
        this.description = level.description;
        this.authorId = level.authorId;
        this.duration = level.duration;
        this.preview = level.preview;
        this.tags = level.tags;
        this.game = level.game;
        this.language = level.language;
    }

    get durationInTicks() {
        return Math.ceil((this.duration * 1000) / TICK_TIME);
    }
}
