var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: [
      path.resolve('.'),
      "node_modules"
    ]
  },
  entry: [
    'babel-polyfill',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist/assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.BannerPlugin(fs.readFileSync('./.banner').toString()),
    new BellOnBundlerErrorPlugin(),
    new ExtractTextPlugin("styles.css"),
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            },
            {
              loader: "autoprefixer-loader"
            }
          ]
        }),
        include: [path.resolve(__dirname, './style')]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: "css-loader"
            }
          ]
        })
      }
    ]
  }
};
