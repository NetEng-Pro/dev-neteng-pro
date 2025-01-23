// webpack.config.dev.js
/*
SPDX-License-Identifier: CC-BY-4.0 OR GPL-3.0-or-later
This file is part of Network Engineering Pro
*/

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development', // Set the mode to development
  devtool: 'inline-source-map', // Enable inline source maps for better debugging
  devServer: {
    liveReload: true, // Enable live reloading
    hot: true, // Enable hot module replacement
    open: true, // Automatically open the browser
    static: {
      directory: path.join(__dirname, './'), // Serve static files from the root directory
    },
  },
  output: {
    chunkFormat: 'array-push', // Specify the chunk format
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'js/[name].bundle.js', // Output file name for better caching in development
    chunkFilename: 'js/[name].chunk.js', // File name for dynamically loaded chunks
    clean: true, // Clean the output directory before emit
  },
  target: 'web', // Ensure the target is set to 'web' for browser environments
});
