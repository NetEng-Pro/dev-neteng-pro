// prettier-eslint-loader.mjs
/* SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
   This file is part of Network Engineering Pro */
/* A Webpack loader that uses prettier-eslint to format the source code
   and analyze it using ESLint. */
/* Loader utilizes existing eslint.config.mjs and .prettierrc configuration
   files. */

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { ESLint } from 'eslint';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import prettier from 'prettier';
import { fileURLToPath } from 'url';
import eslintConfigFlat from './eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prettierOptions = JSON.parse(
  readFileSync(path.resolve(__dirname, './.prettierrc'), 'utf8'),
);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// Separate ignore patterns from the flat config
const ignorePatterns =
  eslintConfigFlat.find((config) => config.ignores)?.ignores || [];

// Remove ignores from the flat config
const filteredEslintConfigFlat = eslintConfigFlat.filter(
  (config) => !config.ignores,
);

// Convert Flat Config to Legacy Config
const eslintConfigLegacy = compat.config(...filteredEslintConfigFlat);

// Commented out logging for debugging
// console.log('ESLint Configuration:', JSON.stringify(eslintConfigLegacy, null, 2));

export default async function (source) {
  const filePath = this.resourcePath;
  const options = {
    text: source,
    eslintConfig: {
      baseConfig: eslintConfigLegacy,
    },
    prettierOptions: {
      ...prettierOptions,
      parser: 'babel', // Specify the parser
      ignorePath: path.resolve(__dirname, '.prettierignore'),
      plugins: [
        (await prettier.resolveConfig(__filename, { editorconfig: true })) ||
          {},
      ],
    },
    fallbackPrettierOptions: {
      singleQuote: false,
    },
  };

  let prettierFormatted;
  try {
    // Prettier format
    prettierFormatted = await prettier.format(source, options.prettierOptions);
  } catch (error) {
    console.error('Error formatting with Prettier:', error);
    throw error;
  }

  // Debugging: Log the type and value of prettierFormatted
  // console.log(`Type of prettierFormatted: ${typeof prettierFormatted}`);
  // console.log('Prettier formatted content:', prettierFormatted);

  // Ensure prettierFormatted is a string
  if (typeof prettierFormatted !== 'string') {
    throw new Error("'prettierFormatted' must be a string");
  }

  // Check if the content has changed before writing back to the file
  const currentContent = readFileSync(filePath, 'utf8');
  if (currentContent !== prettierFormatted) {
    writeFileSync(filePath, prettierFormatted);
  }

  // ESLint analyze
  const eslint = new ESLint({
    baseConfig: options.eslintConfig.baseConfig,
    overrideConfig: {},
    warnIgnored: false,
  });

  const results = await eslint.lintText(prettierFormatted, {
    filePath,
  });

  // Log ESLint messages
  results.forEach((result) => {
    result.messages.forEach((message) => {
      // console.log(message);
    });
  });

  return prettierFormatted;
}
