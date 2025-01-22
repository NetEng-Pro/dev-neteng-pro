// webpack.config.dev.js

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development', // Set the mode to development
  devtool: 'inline-source-map', // Enable inline source maps for better debugging
  devServer: {
    liveReload: true, // Enable live reloading
    hot: true, // Enable hot module replacement
    open: true, // Automatically open the browser
    static: ['./'], // Serve static files from the root directory
  },
  output: {
    chunkFormat: 'array-push', // Specify the chunk format
  },
});
