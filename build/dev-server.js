
require('../config/check-versons')()
var config = require('../config')
var opn = require('opn') 
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
var compiler = webpack(webpackConfig) 

var devMiddleware = require('webpack-dev-middleware')(compiler, {
	publicPath: '/',
  quiet: true 
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
		hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
app.use(hotMiddleware)

// serve pure static assets

app.use('/static', express.static('./static'))

var uri = 'http://localhost:'+config.dev.port

console.log('> Starting dev server...')

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
	if(config.dev.autoOpenBrowser){
		opn(uri)
	}
})

var server = app.listen(config.dev.port)
