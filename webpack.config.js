var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

var LiveReloadPlugin = require('webpack-livereload-plugin');
var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
var OfflinePlugin = require('offline-plugin');

module.exports = {
  resolve: {
    root: [
      path.resolve('.')
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new LiveReloadPlugin(),
    new webpack.BannerPlugin(fs.readFileSync('./.banner').toString()),
    new webpack.optimize.AggressiveMergingPlugin(),
    new BellOnBundlerErrorPlugin(),
    new OfflinePlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
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
}
