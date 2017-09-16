var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

const Merge = require('webpack-merge');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  performance: {
    hints: 'error'
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, '../dist')], {
      root: path.join(__dirname, '..'),
      verbose: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJSPlugin({ exclude: /\.css$/ }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {}
});
