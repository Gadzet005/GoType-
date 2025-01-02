const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

function createWindow() {
    let mainWindow = new BrowserWindow({});
    mainWindow.maximize();

    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, "../dist/index.html"),
            protocol: "file:",
            slashes: true,
        });

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
