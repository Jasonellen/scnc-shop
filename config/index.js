// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
	build: {
		index: path.resolve(__dirname, '../dist/index.html'),
		path: path.resolve(__dirname, '../dist'),
		staticPath: 'static',
		jsPath: 'assets',
		imgPath: 'static',
		cssPath: 'css',
		fontPath: 'font',
		cssSourceMap: true,
		extract: true,
		bundleAnalyzerReport: false 
	},
	dev: {
		port: 8081,
		autoOpenBrowser: true,
		staticPath: 'static',
		cssSourceMap: true
	}
}
