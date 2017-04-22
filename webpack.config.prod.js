var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [
      path.resolve('.')
    ]
  },
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.BannerPlugin(fs.readFileSync('./.banner').toString()),
    new webpack.optimize.AggressiveMergingPlugin(),
    new BellOnBundlerErrorPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader!autoprefixer-loader?{browsers:[">1%"]}',
        includePaths: [path.resolve(__dirname, './style')]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
};