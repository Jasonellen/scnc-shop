var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var _DEV = process.env.NODE_ENV === 'development'
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {

  entry: {
    app: './src/app.js'

  },
  output: {
    path: config.build.path,
    filename: '[name].js',
		publicPath: '/'
  },
  resolve: {  
    extensions: [ '.web.js', '.js', '.json'],
    alias: {
      '@': resolve('src'),
			'~': resolve('src/containers'),
			'static': resolve('static')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: resolve('src'),
				exclude: resolve('src/lib')
      },
      {
        test: /\.js|jsx$/,
        loader: 'babel-loader',
        include: resolve('src'),
      },
			{
				test: /\.css$/,
				include: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader",
							options: {sourceMap: true}
						},
						"postcss-loader"
					]
				})
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader",
							options: {sourceMap: true}
						},
						"postcss-loader",
						"sass-loader",
						{
	            loader: 'sass-resources-loader',
	            options: {
	              // it need a absolute path
	              resources: [resolve('src/style/mixin.scss')]
	            }
		        }
					]
				})
			},
      {
        test: /\.(?:jpg|gif|png|pic|svg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
		          limit: 10000,
		          name: config.build.imgPath+'/[name].[ext]' 
		        },
					}
				],
				exclude:[
					require.resolve('antd-mobile').replace(/warn\.js$/, ''),
					resolve('static/icon'),
				],
      },
			{
				test: /\.(svg)$/i,
				include:[
					resolve('static/icon'),
					require.resolve('antd-mobile').replace(/warn\.js$/, ''),
				],
				use:'svg-sprite-loader',
			},
      {
        test: /\.woff$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: config.build.fontPath+'/[name].[hash:5].[ext]'
        }
      }
    ]
  },
	plugins: [
		new ExtractTextPlugin({
			filename: config.build.cssPath+'/[name].[contenthash:5].css',
			disable: _DEV
		})
	]
}
