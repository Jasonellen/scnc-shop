import { handleActions } from 'redux-actions';

let initialState = {
	showTab: 0, //儿童活力
	"categories": [],
	'products':[]
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
