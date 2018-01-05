import { createActions } from 'redux-actions';

export const { changeData, checkedAll, changeTotalPrice, changeDel } = createActions(
	'changeData',
	'checkedAll',
	'changeTotalPrice',
	'changeDel',
)
//设置初始data数据
export const setListData = () => (dispatch) => {
	_fetch(url.cart)
	.then(data=>{
		data.cart.cart_items.map(function(item){
			item.checked = true
		})
		//改变全选状态
		dispatch(checkedAll({checked:true}))
		dispatch(changeData({data:data.cart}))
		//获得总金额
		dispatch(getTotalPriceAction())
	})
}

//修改Data数据
export const changeDataAction = (data) => (dispatch) => {
	dispatch(changeData({data}))
	//获得总金额
	dispatch(getTotalPriceAction())
}

//全选
export const checkedAllAction = () => (dispatch, getState) => {
	let checked = getState().cart.checked;
	let data = getState().cart.data;
	data.cart_items.map(function(item){
		item.checked = !checked
	})
	//改变全选状态
	dispatch(checkedAll({checked:!checked}))
	dispatch(changeData({data}))
	//获得总金额
	dispatch(getTotalPriceAction())
}

//获取总金额
export const getTotalPriceAction = () => (dispatch, getState) => {
	let data = getState().cart.data;
	let price = 0;
	data.cart_items.map(function(item){
		price += item.checked ? item.price * item.quantity : 0
	})
	dispatch(changeTotalPrice({price}))
}

//点击编辑
export const changeDelAction = () => (dispatch, getState) => {
	let del = getState().cart.del;
	//改变 结算/删除 文字
	dispatch(changeDel({del:!del}))
}
