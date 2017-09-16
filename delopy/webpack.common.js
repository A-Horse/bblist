const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: [path.resolve('.'), 'node_modules']
  },
  devtool: 'source-map',
  entry: {
    app: ['babel-polyfill', 'react-hot-loader/patch', './index']
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
      template: 'template/index.template.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
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
