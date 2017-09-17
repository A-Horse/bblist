const Merge = require('webpack-merge');

const path = require('path');

const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  bail: true,
  cache: true,
  recordsPath: path.join(__dirname, 'records.json'),
  devtool: 'source-map',
  devServer: {
    // clientLogLevel: 'none',
    port: 9000,
    publicPath: '/',
    proxy: require('./proxy-options')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          cache: true,
          quiet: true
        }
      }
    ]
  }
});
