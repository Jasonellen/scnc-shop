module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json   , '!font-size'
    "autoprefixer": {},
		'postcss-pxtorem':{
				rootValue: 75,
				unitPrecision: 5,
				propList: ['*'],
				selectorBlackList: [],
				replace: true,
				mediaQuery: false,
				minPixelValue: 0
			}
  }
}
