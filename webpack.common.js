const path = require('path');

module.exports = {
  // Entry point for the application
  entry: {
    app: './js/app.js', // Main JavaScript file
  },
  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'js/[name].[contenthash].js', // Output file name with contenthash for better caching
    chunkFormat: 'array-push', // Specify the chunk format
    clean: true, // Clean the output directory before emit
  },
  // Module rules
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel loader to transpile ES6+ code
          options: {
            presets: ['@babel/preset-env'], // Ensure you have @babel/preset-env installed
          },
        },
      },
      {
        test: /\.css$/, // Apply this rule to .css files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader to handle CSS files
      },
    ],
  },
  // Optimization settings
  optimization: {
    splitChunks: {
      chunks: 'all', // Split chunks for better caching
    },
  },
  // Plugins
  plugins: [
    // Add any necessary plugins here
  ],
  // Resolve settings
  resolve: {
    extensions: ['.js', '.json'], // Automatically resolve these extensions
  },
};
