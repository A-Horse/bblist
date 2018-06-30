const Merge = require('webpack-merge');
const webpack = require('webpack');

const CommonConfig = require('./webpack.common.js');

module.exports = Merge(CommonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // clientLogLevel: 'none',
    port: 9000,
    publicPath: '/',
    proxy: require('./proxy-options'),
    stats: { children: false }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});
