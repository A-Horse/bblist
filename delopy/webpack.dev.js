const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const path = require('path');

module.exports = Merge(CommonConfig, {
  bail: true,
  cache: true,
  recordsPath: path.join(__dirname, 'records.json'),
  devServer: {
    clientLogLevel: 'none',
    port: 9000,
    publicPath: '/',
    proxy: {
      // order is important
      '/api/t/': 'http://localhost:5502',
      '/api/ts/': 'http://localhost:5501',
      '/api': 'http://localhost:5500',
      '/storage': 'http://localhost:5500'
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin({})]
});
