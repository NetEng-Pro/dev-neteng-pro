/*
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Engineering Pro
*/

import pluginJs from "@eslint/js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    ignores: ["!eslintconfig.mjs", "**/*.mjs", "**/.vscode", "**/node_modules"],
    languageOptions: {
      sourceType: "commonjs",
      parserOptions: {
        ecmaVersion: 2022,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es6,
        ...globals.mocha, // Add Mocha globals
      },
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
      "indent": ["error", 2],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
    },
  },
  pluginJs.configs.recommended,
];