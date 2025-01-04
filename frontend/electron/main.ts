import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import url from "url";
import { AppStore } from "./store.js";

function createWindow() {
    let mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    let store = new AppStore();

    ipcMain.handle("get-tokens", () => {
        return store.getTokens();
    });
    ipcMain.handle("store-tokens", (_, accessToken: any, refreshToken: any) => {
        store.storeTokens(accessToken, refreshToken);
    });
    ipcMain.handle("clear-tokens", () => {
        store.clearTokens();
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
}

app.whenReady().then(() => {
    createWindow();

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
