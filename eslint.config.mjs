/*
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Engineering Pro
*/

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import mocha from "eslint-plugin-mocha";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/eslintconfig.mjs", "**/*.mjs", "**/.vscode", "**/node_modules"],
}, ...compat.extends("eslint:recommended", "plugin:mocha/recommended", "prettier"), {
    plugins: {
        mocha,
    },
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.mocha,
            window: "readonly",
            document: "readonly",
            navigator: "readonly",
            console: "readonly",
            module: "readonly",
            process: "readonly",
            require: "readonly",
            exports: "readonly",
            global: "readonly",
            Buffer: "readonly",
            __dirname: "readonly",
            __filename: "readonly",
            describe: "readonly",
            it: "readonly",
            before: "readonly",
            after: "readonly",
            beforeEach: "readonly",
            afterEach: "readonly",
        },
        ecmaVersion: 2022,
        sourceType: "commonjs",
    },
    rules: {
        "mocha/no-exclusive-tests": "error",
        "mocha/no-skipped-tests": "warn",
        "mocha/no-hooks-for-single-case": "warn",
        indent: ["error", 2],
        quotes: ["error", "single"],
        semi: ["error", "always"],
    },
}];
