const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("userAPI", {
    getTokens: async () => {
        return await ipcRenderer.invoke("get-tokens");
    },
    storeTokens: async (accessToken, refreshToken) => {
        await ipcRenderer.invoke("store-tokens", accessToken, refreshToken);
    },
    clearTokens: async () => {
        await ipcRenderer.invoke("clear-tokens");
    },
});

contextBridge.exposeInMainWorld("levelAPI", {
    getLevels: async () => {
        return await ipcRenderer.invoke("get-levels");
    },
    getLevel: async (levelId) => {
        return await ipcRenderer.invoke("get-level", levelId);
    },
    addLevel: async (level) => {
        await ipcRenderer.invoke("add-level", level);
    },
    removeLevel: async (levelId) => {
        await ipcRenderer.invoke("remove-level", levelId);
    },
});
