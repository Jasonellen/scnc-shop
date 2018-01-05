
require('../config/check-versons')()
var config = require('../config')
var opn = require('opn') //用来用默认浏览器打开一个网页(图片/文件都行)
var path = require('path')
var express = require('express')
var webpack = require('webpack')

//node.js http代理中间件，轻松完成链接等操作
//例如 app.use('/api', proxy({target: 'http://www.example.org', changeOrigin: true}));
// 		app.listen(3000);
// -> http://localhost:3000/api/foo/bar -> http://www.example.org/api/foo/bar
// var proxyMiddleware = require('http-proxy-middleware')

var webpackConfig = require('./webpack.dev.config')

var app = express()
var compiler = webpack(webpackConfig) //创建webpack编译对象

var devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: '/',
  quiet: true //禁用在控制台输出相关信息
})
//官方释义：只能配合webpack-dev-middleware使用
var hotMiddleware = require('webpack-hot-middleware')(compiler)

//这里主要是要实现html内容改变也可以热更新
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
		hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// handle fallback for HTML5 history API
//单页SPA，router/index.js的’*‘设置404页面
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
app.use(hotMiddleware)

// serve pure static assets
//设置静态文件路径->现在可以在html中通过/static访问根目录/static静态文件了
app.use('/static', express.static('./static'))

var uri = 'http://localhost:'+config.dev.port

console.log('> Starting dev server...')
//当开发中间件生效的时候打印日志并打开浏览器
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
	if(config.dev.autoOpenBrowser){
		opn(uri)
	}
})

var server = app.listen(config.dev.port)
