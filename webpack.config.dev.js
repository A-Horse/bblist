var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// var OfflinePlugin = require('offline-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: [
      path.resolve('.'),
      "node_modules"
    ]
  },
  devtool: 'source-map',
  entry: [
    // 'webpack-dev-server/client?http://octopus.com/',
    // 'webpack-hot-middleware/client',
    // 'webpack/hot/only-dev-server',
    'babel-polyfill',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.BannerPlugin(fs.readFileSync('./.banner').toString()),
    // new webpack.optimize.AggressiveMergingPlugin(),
    new BellOnBundlerErrorPlugin(),
    new ExtractTextPlugin("styles.css"),
    // new OfflinePlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new UglifyJsPlugin({
    //   sourceMap: true
    // })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          },
          {
            loader: "autoprefixer-loader",
            options: {
              browsers: [">1%"]
            }
          }
        ],
        // loader: 'style-loader!css-loader!sass-loader!autoprefixer-loader?{browsers:[">1%"]}',
        include: [path.resolve(__dirname, './style')]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
        // loader: 'style-loader!css-loader'
      },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }
    ]
  }
};
