import Store from "electron-store";

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
};

export class AppStore {
    store: Store<any>;

    constructor() {
        this.store = new Store({ schema: appStoreSchema });
    }

    storeTokens(accessToken, refreshToken) {
        this.store.set("user.accessToken", accessToken);
        this.store.set("user.refreshToken", refreshToken);
    }

    getTokens() {
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
}
