import Store from "electron-store";
import { AuthTokens } from "../../common/authTokens";

const appStoreSchema = {
    user: {
        type: "object",
        properties: {
            accessToken: {
                type: "string",
            },
            refreshToken: {
                type: "string",
            },
        },
    },
    savedLevels: {
        type: "array",
        items: { type: "integer" },
        default: [],
    },
};

export class AppStore {
    store: Store<any>;

    constructor() {
        // @ts-expect-error
        this.store = new Store({ schema: appStoreSchema });
    }

    storeTokens(accessToken: string, refreshToken: string) {
        this.store.set("user.accessToken", accessToken);
        this.store.set("user.refreshToken", refreshToken);
    }

    getTokens(): AuthTokens | undefined {
        const accessToken = this.store.get("user.accessToken", undefined);
        const refreshToken = this.store.get("user.refreshToken", undefined);
        if (accessToken === undefined || refreshToken === undefined) {
            return undefined;
        }
        return { accessToken, refreshToken };
    }

    clearTokens() {
        this.store.delete("user.accessToken");
        this.store.delete("user.refreshToken");
    }

    getSavedLevels(): number[] {
        return this.store.get("savedLevels");
    }

    isLevelSaved(levelId: number): boolean {
        const levels = this.getSavedLevels();
        return levels.includes(levelId);
    }

    addLevel(levelId: number) {
        const levels = this.getSavedLevels();
        if (!levels.includes(levelId)) {
            levels.push(levelId);
            this.store.set("savedLevels", levels);
        }
    }

    removeLevel(levelId: number) {
        const levels = this.getSavedLevels();
        const newLevels = levels.filter((id) => id != levelId);
        this.store.set("savedLevels", newLevels);
    }
}
