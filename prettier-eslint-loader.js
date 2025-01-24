// prettier-eslint-loader.js
/* SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
   This file is part of Network Engineering Pro */
/* A Webpack loader that uses prettier-eslint to format the source code
   and analyze it using ESLint. */
/* Loader utilizes existing eslint.config.mjs and .prettierrc configuration
   files. */

const format = require('prettier-eslint');
const { analyze } = require('prettier-eslint');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const eslintConfig = require('./eslint.config.mjs').default;
const prettierOptions = JSON.parse(readFileSync('./.prettierrc', 'utf8'));

module.exports = async function (source) {
  const options = {
    text: source,
    eslintConfig: eslintConfig.find((config) =>
      config.files.includes('**/*.js'),
    ),
    prettierOptions: prettierOptions,
    fallbackPrettierOptions: {
      singleQuote: false,
    },
  };

  // Format the source code
  const formatted = format(options);

  // Analyze the source code
  const result = await analyze(options);
  console.log(result.messages);

  return formatted;
};
