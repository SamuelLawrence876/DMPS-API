module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  collectCoverage: true,
  roots: ["<rootDir>/src"],
  modulePaths: ["<rootDir>/src"],
  testMatch: ["<rootDir>/src/**/**.(spec|test).[jt]s"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  forceExit: true,
  verbose: true,
  testEnvironment: "node",
};
