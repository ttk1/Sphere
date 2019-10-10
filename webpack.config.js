const path = require('path');

module.exports = {
  entry: {
    index: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'index.js'
  },
  devServer: {
    contentBase: 'docs',
    port: 3000
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.glsl']
  },
  module: {
    rules: [{
      test: /\.glsl$/,
      exclude: [/node_modules/],
      use: 'raw-loader'
    },
    {
      test: /\.ts$/,
      exclude: [/node_modules/],
      use: 'ts-loader'
    }]
  }
};