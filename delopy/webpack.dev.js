var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Merge(CommonConfig, {});
