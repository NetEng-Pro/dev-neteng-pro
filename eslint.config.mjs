/*
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Engineering Pro
*/

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import mocha from 'eslint-plugin-mocha';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:mocha/recommended',
    'prettier',
  ),
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    ignores: ['**/dist/**/app.*.js','**/dist/**/runtime.*.js','**/.prettierrc', '**/.vscode', '**/node_modules'],
    plugins: {
      mocha,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
      },
      ecmaVersion: 2022,
      sourceType: 'module',  // Set the source type to ECMAScript module code
    },
    rules: {
      'mocha/no-exclusive-tests': 'warn',
      'mocha/no-skipped-tests': 'warn',
      'mocha/no-hooks-for-single-case': 'warn',
      'indent': ['error', 2],
      'quotes': 'off', // Turn off the 'quotes' rule
      'semi': ['error', 'always'],
      'constructor-super': 'warn',
      'for-direction': 'warn',
      'getter-return': 'warn',
      'no-async-promise-executor': 'warn',
      'no-case-declarations': 'warn',
      'no-class-assign': 'warn',
      'no-compare-neg-zero': 'warn',
      'no-cond-assign': 'warn',
      'no-const-assign': 'warn',
      'no-constant-binary-expression': 'warn',
      'no-constant-condition': 'warn',
      'no-control-regex': 'warn',
      'no-debugger': 'warn',
      'no-delete-var': 'warn',
      'no-dupe-args': 'warn',
      'no-dupe-class-members': 'warn',
      'no-dupe-else-if': 'warn',
      'no-dupe-keys': 'warn',
      'no-duplicate-case': 'warn',
      'no-empty': 'warn',
      'no-empty-character-class': 'warn',
      'no-empty-pattern': 'warn',
      'no-empty-static-block': 'warn',
      'no-ex-assign': 'warn',
      'no-extra-boolean-cast': 'warn',
      'no-fallthrough': 'warn',
      'no-func-assign': 'warn',
      'no-global-assign': 'warn',
      'no-import-assign': 'warn',
      'no-invalid-regexp': 'warn',
      'no-irregular-whitespace': 'warn',
      'no-loss-of-precision': 'warn',
      'no-misleading-character-class': 'warn',
      'no-new-native-nonconstructor': 'warn',
      'no-nonoctal-decimal-escape': 'warn',
      'no-obj-calls': 'warn',
      'no-octal': 'warn',
      'no-prototype-builtins': 'warn',
      'no-redeclare': 'warn',
      'no-regex-spaces': 'warn',
      'no-self-assign': 'warn',
      'no-setter-return': 'warn',
      'no-shadow-restricted-names': 'warn',
      'no-sparse-arrays': 'warn',
      'no-this-before-super': 'warn',
      'no-undef': 'warn',
      'no-unexpected-multiline': 'warn',
      'no-unreachable': 'warn',
      'no-unsafe-finally': 'warn',
      'no-unsafe-negation': 'warn',
      'no-unsafe-optional-chaining': 'warn',
      'no-unused-labels': 'warn',
      'no-unused-private-class-members': 'warn',
      'no-unused-vars': 'warn',
      'no-useless-backreference': 'warn',
      'no-useless-catch': 'warn',
      'no-useless-escape': 'warn',
      'no-with': 'warn',
      'require-yield': 'warn',
      'use-isnan': 'warn',
      'valid-typeof': 'warn',
    },
  },
];
