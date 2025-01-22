import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import url from "url";
import { AppStore } from "./store";
import { LevelStore } from "./levelStore";
import { Level } from "../common/level";

function createWindow(): BrowserWindow {
    let mainWindow = new BrowserWindow({
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            preload: path.join(__dirname, "preload.js"),
        },
        autoHideMenuBar: true,
    });

    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, "../dist/index.html"),
            protocol: "file:",
            slashes: true,
        });

    mainWindow.maximize();
    mainWindow.loadURL(startUrl);
    return mainWindow;
}

function createStore(): { mainStore: AppStore; levelStore: LevelStore } {
    let mainStore = new AppStore();
    let levelStore = new LevelStore(
        path.join(app.getPath("userData"), "levels")
    );

    ipcMain.handle("get-tokens", async () => {
        return mainStore.getTokens();
    });
    ipcMain.handle(
        "store-tokens",
        async (_, accessToken: any, refreshToken: any) => {
            mainStore.storeTokens(accessToken, refreshToken);
        }
    );
    ipcMain.handle("clear-tokens", async () => {
        mainStore.clearTokens();
    });

    ipcMain.handle("get-levels", async () => {
        const levelIds = mainStore.getSavedLevels();

        const awaitedLevels: Promise<Level | null>[] = [];
        for (const levelId of levelIds) {
            awaitedLevels.push(levelStore.getLevel(levelId));
        }

        const levels: Level[] = [];
        for (const awaitedLevel of awaitedLevels) {
            try {
                const level = await awaitedLevel;
                if (level) {
                    levels.push(level);
                } else {
                    console.error("Level not found");
                }
            } catch (err) {
                console.error("Error fetching level:", err);
            }
        }

        return levels;
    });

    ipcMain.handle("get-level", async (_, levelId: any) => {
        return await levelStore.getLevel(levelId);
    });

    ipcMain.handle("add-level", async (_, level: any) => {
        mainStore.addLevel(level.id);
        await levelStore.createLevel(level);
    });

    ipcMain.handle("remove-level", async (_, levelId: any) => {
        mainStore.removeLevel(levelId);
        levelStore.removeLevel(levelId);
    });

    return { mainStore, levelStore };
}

app.whenReady().then(() => {
    createStore();
    createWindow();

    ipcMain.handle("quit-app", async () => {
        app.quit();
    });

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
