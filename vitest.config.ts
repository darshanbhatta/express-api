import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        coverage: {
            reporter: ["text", "json", "html"],
            exclude: ["node_modules/**", "dist/**", "coverage/**", "**/*.test.ts", "**/*.test.tsx", "vitest.config.ts"],
        },
        setupFiles: [],
    },
    resolve: {
        alias: {
            src: resolve(__dirname, "./src"),
            "@": resolve(__dirname, "./src"),
        },
    },
    esbuild: {
        target: "ES2022",
    },
});
