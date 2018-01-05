// application's entry
require('es6-promise').polyfill()
require('isomorphic-fetch')
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {compose, createStore, applyMiddleware} from 'redux'
import {persistStore, autoRehydrate} from 'redux-persist' // 做本地持久化
import { asyncSessionStorage } from 'redux-persist/storages'
import FastClick from 'fastclick' // 解决移动端300ms延迟
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from '@/reducers/index'
import Routers from './routers/router'
import BackHome from '@/components/BackHome'
import '@/service/global'
// import VConsole from 'vconsole/dist/vconsole.min.js'
// new VConsole();
// 解决移动端300ms延迟
FastClick.attach(document.body)

const middleWares = [thunk]
if (process.env.NODE_ENV == 'development') {
	const logger = createLogger()
	middleWares.push(logger)
}

const store = compose(applyMiddleware(...middleWares),autoRehydrate())(createStore)(reducers)

// 做本地持久化
persistStore(store, {
	storage: asyncSessionStorage,
	blacklist: ['tabBar','order','manageAccount','paySet', 'walletFull','drawBack','bindAccount'],
	// whitelist: []  黑白名单只能选择一个,优先选择白名单
}, ()=>{
	render((
		<Provider store={store}>
			<div style={{width:'100%',height:'100%'}}>
				<BackHome/>
				<Routers />
			</div>
		</Provider>
	), document.getElementById('root'))
})

// 开启局部热更新
if (module.hot) {
	module.hot.accept() //无刷新
	// Enable Webpack hot module replacement for reducers
	module.hot.accept('@/reducers/index', () => {
		const nextRootReducer = require('@/reducers/index');
		store.replaceReducer(nextRootReducer);
	});
}





