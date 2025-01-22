const path = require('path');

module.exports = {
  entry: {
    app: './js/app.js', // Entry point for your application
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'js/app.js', // Output file name
    chunkFormat: 'array-push', // Specify the chunk format
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel loader to transpile ES6+ code
        },
      },
    ],
  },
};
