const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    chunkFormat: 'array-push', // Specify the chunk format
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'img' },
        { from: 'css', to: 'css' },
        { from: 'js/vendor', to: 'js/vendor' },
        { from: 'favicon.svg', to: 'favicon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'favicon-apple.png', to: 'favicon-apple.png' },
        { from: 'favicon-512.png', to: 'favicon-512.png' },
        { from: 'favicon-192.png', to: 'favicon-192.png' },
        { from: 'favicon-light.ico', to: 'favicon-light.ico' },
        { from: 'favicon-light.svg', to: 'favicon-light.svg' },
        { from: 'legal.html', to: 'legal.html' },
        { from: 'LICENSE.md', to: 'LICENSE.md' },
        { from: 'README.md', to: 'README.md' },
        { from: '404.html', to: '404.html' },
        { from: 'bimi-svg-tiny-ps.xml', to: 'bimi-svg-tiny-ps.xml' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});
