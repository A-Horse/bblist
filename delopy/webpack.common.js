const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    modules: [path.resolve('.'), 'node_modules']
  },
  entry: {
    main: ['./index.js']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: '/',
    chunkFilename: '[name]-[id].bundle.js'
  },
  optimization: {
    occurrenceOrder: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -15
        },
        libs: {
          test: /[\\/]node_modules[\\/](react|redux|antd|rc-\w+)/,
          priority: -10
        }
      }
    }
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
      production: process.env.NODE_ENV === 'production'
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
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
