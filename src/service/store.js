//redux热更新是更新app.js, store需要在app.js之外产生(无警告⚠️)
import {compose, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducers from '@/reducers/index'
import {autoRehydrate} from 'redux-persist' // 做本地持久化

const middleWares = [thunk]
if (process.env.NODE_ENV == 'development') {
	const logger = createLogger()
	middleWares.push(logger)
}
const store = compose(applyMiddleware(...middleWares),autoRehydrate())(createStore)(reducers)
export default store