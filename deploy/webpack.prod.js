const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  mode: 'production',
  performance: {
    hints: 'warning'
  },
  output: {
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name]-[id].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'favicon.ico', to: 'favicon.ico' },
      { from: 'assets', to: 'assets' },
      { from: 'static', to: 'static' }
    ]),
    new CleanWebpackPlugin([path.join(__dirname, '../dist')], {
      root: path.join(__dirname, '..'),
      verbose: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new VisualizerPlugin({
      filename: path.join('./statistics.html')
    })
  ]
});
