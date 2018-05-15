// application's entry
require('es6-promise').polyfill()
require('isomorphic-fetch')
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist' // 做本地持久化
import { asyncSessionStorage } from 'redux-persist/storages'
import Enter from './routers'
import '@/service/global'
import store from '@/service/store'

// 做本地持久化
persistStore(store, {
	storage: asyncSessionStorage,
	// blacklist: ['classify','tabBar','order','manageAccount','paySet', 'walletFull','drawBack','bindAccount'],
	whitelist: ['other']  //黑白名单只能选择一个,优先选择白名单
}, ()=>{
	render((
		<Provider store={store}>
			<Enter/>
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





