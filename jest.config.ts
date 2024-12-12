import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  setupFilesAfterEnv: ["jest-canvas-mock"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Map @ to src
    "^lodash-es$": "lodash",
  },
  workerIdleMemoryLimit: 512,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "src/__tests__", "components/__tests__"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
  ],
};

const jestConfig = createJestConfig(config);

export default jestConfig;
