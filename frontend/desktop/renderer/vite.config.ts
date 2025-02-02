/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    base: "",
    test: {
        globals: true,
        setupFiles: "./tests/setup.ts",
        coverage: {
            reporter: ["text"],
        },
        environment: "jsdom",
    },
});
