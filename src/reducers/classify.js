import { handleActions } from 'redux-actions';

let initialState = {
	showTab: 0, //儿童活力
	"categories": [
		{
			"name": "儿童活力",
			"sort": 1
		}
	],
	'products':[
		{
			"id": 5,
			"name": "name",
			"purchases_count": 0,
			"price": "1.0",
			"image_url": "/static/goods.jpg"
		}
	]
}
const _sort = handleActions({
	changeShowTab: (state, action) => ({
		...state,
		showTab: action.payload
	}),
	setClassifyData: (state, action) => ({
		...state,
		categories: action.payload
	}),
	setClassifyDetailData: (state, action) => ({
		...state,
		products: action.payload
	})
}, initialState);


export default _sort;
