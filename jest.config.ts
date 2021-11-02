import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  testRegex: ["(/__test__/.*|(\\.|/)(test|spec))\\.[jt]sx?$"],

  // testRegex: ['.e2e-spec.ts$'],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  verbose: true,
};

export default config;