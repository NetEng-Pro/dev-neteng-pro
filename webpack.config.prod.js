const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash].js', // Use contenthash for better caching
    path: path.resolve(__dirname, 'dist'), // Output directory
    chunkFormat: 'array-push', // Specify the chunk format
    clean: true, // Clean the output directory before emit
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Remove console logs for better performance
          },
          format: {
            beautify: true, // Preserve whitespace in JavaScript files
          },
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }, // Remove comments, but preserve whitespace
              normalizeWhitespace: false, // Preserve whitespace in CSS files
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: 'all', // Split chunks for better caching
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Template for the HTML file
      minify: {
        removeComments: true, // Remove comments
        removeRedundantAttributes: true, // Remove redundant attributes
        useShortDoctype: true, // Use short DOCTYPE
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: false, // Preserve whitespace in inline JavaScript
        minifyCSS: false, // Preserve whitespace in inline CSS
        minifyURLs: true,
        // collapseWhitespace is intentionally omitted to preserve whitespace
      },
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
