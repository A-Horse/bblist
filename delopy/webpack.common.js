const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: [path.resolve('.'), 'node_modules']
  },
  entry: {
    main: ['babel-polyfill', 'react-hot-loader/patch', './index'],
    react: [
      'react',
      'react-dom',
      'react-router',
      'react-router-dom',
      'react-dom-factories',
      'react-redux',
      'react-router-redux',
      'redux-observable',
      'redux'
    ],
    miscellaneous: ['isomorphic-fetch', 'moment', 'normalizr', 'ramda', 'immutable']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    chunkFilename: '[name]-[id].bundle.js'
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      title: 'Octopuse',
      filename: 'index.html',
      template: 'template/index.template.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      production: process.env.NODE_ENV === 'production'
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: process.env.NODE_ENV !== 'production'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['react', 'miscellaneous']
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
        exclude: /node_modules/
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
              loader: 'sass-loader',
              options: {
                workerParallelJobs: 2
              }
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
