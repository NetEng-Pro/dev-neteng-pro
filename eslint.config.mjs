import pluginJs from "@eslint/js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
    env: {
      browser: true,
      es6: true,
      node: true,
      mocha: true, // Add Mocha environment
    },
    parserOptions: {
      ecmaVersion: 2020,
    },
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.mocha, // Add Mocha globals
    },
    extends: [
      "eslint:recommended", // Extend recommended ESLint rules
      "plugin:mocha/recommended", // Extend recommended Mocha plugin rules
    ],
    plugins: ["mocha"], // Add Mocha plugin
    rules: {
      // Add custom rules or overrides here
      "mocha/no-exclusive-tests": "error", // Prevents accidental `describe.only` or `it.only`
      "mocha/no-skipped-tests": "warn", // Warns against skipped tests (`it.skip`)
      "mocha/no-hooks-for-single-case": "warn", // Avoids unnecessary `beforeEach` hooks in single tests
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  },
  pluginJs.configs.recommended,
];
