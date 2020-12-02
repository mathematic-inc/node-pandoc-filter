module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
  ],
  plugins: ["eslint-plugin-tsdoc"],
  parser: "@typescript-eslint/parser",
  rules: {
    "spaced-comment": [2, "always", { markers: ["/"], exceptions: ["*"] }],
    "no-useless-constructor": 0,
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
    "tsdoc/syntax": "error",
    "@typescript-eslint/padding-line-between-statements": [
      2,
      // Imports
      { blankLine: "always", prev: "import", next: "*" },
      { blankLine: "never", prev: "import", next: "import" },
      // Exports
      { blankLine: "always", prev: "export", next: "*" },
      { blankLine: "always", prev: "*", next: "export" },
      { blankLine: "never", prev: "singleline-export", next: "singleline-export" },
      // Let
      { blankLine: "always", prev: "*", next: "let" },
      { blankLine: "always", prev: "let", next: "*" },
      { blankLine: "never", prev: "let", next: "let" },
      // Constants
      { blankLine: "always", prev: "*", next: "const" },
      { blankLine: "always", prev: "const", next: "*" },
      { blankLine: "never", prev: "singleline-const", next: "singleline-const" },
      { blankLine: "always", prev: "*", next: "export const" },
      { blankLine: "always", prev: "export const", next: "*" },
      { blankLine: "never", prev: "singleline-export const", next: "singleline-export const" },
      // Type
      { blankLine: "always", prev: "*", next: "type" },
      { blankLine: "always", prev: "type", next: "*" },
      { blankLine: "always", prev: "type", next: "type" },
      { blankLine: "always", prev: "export type", next: "*" },
      { blankLine: "always", prev: "*", next: "export type" },
      // Enums
      { blankLine: "always", prev: "*", next: "export const enum" },
      { blankLine: "always", prev: "export const enum", next: "*" },
      // Interface
      { blankLine: "always", prev: "export interface", next: "*" },
      { blankLine: "always", prev: "*", next: "export interface" },
      // Function
      { blankLine: "always", prev: "*", next: "function" },
      { blankLine: "always", prev: "function", next: "*" },
      // If
      { blankLine: "always", prev: "*", next: "if" },
      { blankLine: "always", prev: "if", next: "*" },
      { blankLine: "never", prev: "singleline-if", next: "singleline-if" },
      // For
      { blankLine: "always", prev: "*", next: "for" },
      { blankLine: "always", prev: "for", next: "*" },
      // Switch
      { blankLine: "always", prev: "*", next: "switch" },
      // Returns
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "never", prev: "return", next: "case" },
    ],
    /**
     * (Override) Because AirBnB is sometimes dumb
     */
    "no-restricted-syntax": 0,
    /**
     * (Override) `type` imports require this
     */
    "import/no-named-default": 0,
    /**
     * (Override) Errors on `ts` extensions
     */
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.generated.ts"],
      rules: {
        "no-shadow": 0,
        "no-use-before-define": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "import/prefer-default-export": 0,
      },
    },
    {
      files: ["**/index.ts"],
      rules: {
        "import/prefer-default-export": 0,
      },
    },
  ],
};
