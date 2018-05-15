var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/hot-entry'].concat(baseWebpackConfig.entry[name])
})


module.exports = merge(baseWebpackConfig, {
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
		
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")  
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
		
    new webpack.NoEmitOnErrorsPlugin(),
   
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true 
    }),
		
    new FriendlyErrorsPlugin()
  ]
})
