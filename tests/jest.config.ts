import type { Config } from "jest";

const transformPackages = ["mongoose"];

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
// const config: Config = {
//     collectCoverage: true,
//     rootDir: "../",
//     // setupFilesAfterEnv: ["<rootDir>/tests/jest.setup.ts"],
//     verbose: true,
//     transform: {
//         "^.+\\.(t|j)sx?$": ["esbuild-jest", { sourcemap: true }],
//     },
//     transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${transformPackages.join("|")})/)`],
//     testPathIgnorePatterns: ["node_modules"],
//     coveragePathIgnorePatterns: ["node_modules"],
//     testMatch: ["<rootDir>/tests/**/*.test.ts?(x)"],
//     moduleNameMapper: {
//         "^src/(.*)": "<rootDir>/src/$1",
//         "^scripts/(.*)": "<rootDir>/scripts/$1",
//         "^tests/(.*)": "<rootDir>/tests/$1",
//     },
//     moduleFileExtensions: ["ts", "tsx", "js"],
//     collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!<rootDir>/node_modules/", "!**/*.d.ts"],
//     coverageReporters: ["text", "lcov", "json-summary"],
//     reporters: [["github-actions", { silent: false }], "default"],
//     moduleDirectories: ["node_modules", "src", __dirname],
//     testLocationInResults: true,
//     cacheDirectory: "<rootDir>/node_modules/.cache/jest",
// };

const config: Config = {
    rootDir: "../",
    moduleFileExtensions: ["ts", "tsx", "js"],
    coveragePathIgnorePatterns: ["/node_modules/"],
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
