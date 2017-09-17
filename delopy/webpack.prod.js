const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');

const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  performance: {
    hints: 'warning'
  },
  output: {
    filename: '[name].[chunkhash].bundle.js'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      { from: 'favicon.ico', to: 'favicon.ico' },
      { from: 'assets', to: 'assets' },
      { from: 'static', to: 'static' }
    ]),
    new CleanWebpackPlugin([path.join(__dirname, '../dist')], {
      root: path.join(__dirname, '..'),
      verbose: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJSPlugin({
      exclude: [/\.css$/, /\.scss$/],
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new VisualizerPlugin({
      filename: path.join('./statistics.html')
    })
  ],
  module: {}
});
