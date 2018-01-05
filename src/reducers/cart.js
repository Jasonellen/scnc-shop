import { handleActions } from 'redux-actions';

let initialState = {
	checked: false, //全选状态
	totalPrice: 0,
	data:{
		"cart_items": [],
		"total_item_quantity": 0,
		"total": 0
	},
	del:false
}
const cart = handleActions({
	changeData: (state, action) => ({
		...state,
		data: action.payload.data
	}),
	checkedAll: (state, action) => ({
		...state,
		checked: action.payload.checked,
	}),
	changeTotalPrice: (state, action) => ({
		...state,
		totalPrice:Number(action.payload.price).toFixed(2) == 0 ? 0 : Number(action.payload.price).toFixed(2)
	}),
	changeDel: (state, action) => ({
		...state,
		del:action.payload.del
	}),
}, initialState);


export default cart;
