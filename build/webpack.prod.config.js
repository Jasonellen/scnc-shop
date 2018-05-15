var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
	output: {
	
    path: config.build.path,
    filename: config.build.jsPath+'/[name].[chunkhash:5].js',
    chunkFilename: config.build.jsPath+'/[name].[chunkhash:5].js'
  },
  devtool: 'cheap-module-source-map',
  plugins: [
		
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("production")
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
  
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true, 
        collapseWhitespace: false, 
        removeAttributeQuotes: true 
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
     
      chunksSortMode: 'dependency'
    }),
    
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
   
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'] //依赖vendor
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.build.assetsSubDirectory,
    //     ignore: ['.*']
    //   }
    // ])
  ]
})

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
