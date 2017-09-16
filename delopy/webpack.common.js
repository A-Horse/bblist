const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: [path.resolve('.'), 'node_modules']
  },
  devtool: 'source-map',
  devServer: {
    // lazy: true,
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
  entry: {
    app: ['babel-polyfill', './index']
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Octopuse',
      filename: 'index.html',
      template: 'template/index.template.ejs'
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: process.env.NODE_ENV !== 'production'
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
        include: path.join(__dirname, '..')
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            },
            {
              loader: 'autoprefixer-loader'
            }
          ]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            }
          ]
        })
      }
    ]
  }
};
