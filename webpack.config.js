// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WebExtWebpackPlugin = require('@abdullah2993/web-ext-webpack-plugin');

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'extension'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.js',
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'manifest.json' }],
    }),
    new WebExtWebpackPlugin({ sourceDir: path.resolve(__dirname, 'extension') }),
  ],
};

module.exports = config;
