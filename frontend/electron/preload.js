const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("storeAPI", {
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
