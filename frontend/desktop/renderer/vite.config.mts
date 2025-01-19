import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    base: "",
    resolve: {
        alias: [
            { find: "@", replacement: path.resolve(__dirname, "src") },
            {
                find: "@common",
                replacement: path.resolve(__dirname, "../../common"),
            },
            {
                find: "@desktop-common",
                replacement: path.resolve(__dirname, "../common"),
            },
        ],
    },
});
