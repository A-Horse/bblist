const Merge = require('webpack-merge');
const webpack = require('webpack');

const path = require('path');

const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  devtool: 'source-map',
  devServer: {
    // clientLogLevel: 'none',
    port: 9000,
    publicPath: '/',
    proxy: require('./proxy-options')
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name]-[id].bundle.js.map',
      exclude: ['vendor.miscellaneous.js']
    })
  ]
  /* module: {
   *   rules: [
   *     {
   *       enforce: 'pre',
   *       test: /\.jsx?$/,
   *       exclude: /node_modules/,
   *       loader: 'eslint-loader',
   *       options: {
   *         fix: true,
   *         cache: true,
   *         quiet: true
   *       }
   *     }
   *   ]
   * }*/
});
