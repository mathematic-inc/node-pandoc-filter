export default {
  globals: { "ts-jest": { isolatedModules: true } },
  testEnvironment: "node",
  transform: { "^.+\\.tsx?$": "ts-jest" },
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{js,ts}"],
  coverageReporters: ["text-summary", "lcov"],
  snapshotResolver: "<rootDir>/tests/examples/utils/jest-snapshot-resolver.js",
};
