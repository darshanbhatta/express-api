import type { Config } from "jest";

const config: Config = {
    rootDir: "./",
    moduleFileExtensions: ["ts", "tsx", "js"],
    coveragePathIgnorePatterns: ["/node_modules/"],
    coverageDirectory: "./coverage",
    transform: {
        "^.+\\.(ts|tsx)$": ["esbuild-jest", { sourcemap: true }],
    },
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
    testMatch: ["**/?*.test.+(ts|tsx|js)"],
    moduleNameMapper: {
        "^src/(.*)": "<rootDir>/src/$1",
        "^scripts/(.*)": "<rootDir>/scripts/$1",
        "^tests/(.*)": "<rootDir>/tests/$1",
    },
};

export default config;
