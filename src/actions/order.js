import { createActions } from 'redux-actions';

export const {
	setSendWayData, changeSendWay, setSendTimeData, changeSendTime,
	changeList, setAddress, setShippings, setShippingTypes, changeMemo, changePrice,
	changeCanBack, toOrderBuy, changePayType, changePaySuccess, changeConfig, changeWalletPay
} = createActions(
	'setSendWayData', //设置配送方式
	'changeSendWay',  //配送方式picker
	'setSendTimeData', //设置配送类型
	'changeSendTime', //配送类型picker
	'setAddress',  //设置省市区
	'setShippings',   //设置源配送方式
	'setShippingTypes', //设置源配送类型
	'changeMemo', //修改备注
	'changePrice',
	'changePayType',
	'changePaySuccess',
	'changeConfig',
	'changeWalletPay'
)

//初始化配送方式
export const initialShippings = (data) => (dispatch)=>{
	dispatch(setShippings(data))
	let newData = [[]]
	data.map(function(item){
		newData[0].push({
			label: item.name,
			value: item.id,
		})
	})
	dispatch(setSendWayData(newData))
	//设置默认配送方式
	let id = data.find(function(item){
		return item.default == true
	}).id
	console.log(id,444)
	dispatch(sendSelect(id))
}

//初始化配送类型
export const initialShipping_types = (data) => (dispatch)=>{
	dispatch(setShippingTypes(data))
	let newData = [[]]
	data.map(function(item){
		newData[0].push({
			label: item.name,
			value: item.id,
		})
	})
	dispatch(setSendTimeData(newData))
	//设置默认配送类型
	let id = data.find(function(item){
		return item.default == true
	}).id
	dispatch(sendSelectType(id))
}

//选中配送方式
export const sendSelect = (id) => (dispatch, getState)=>{
	let newData = getState().order.shippings
	let name = newData.filter(function(item){
		return item.id == id
	})[0].name
	dispatch(changeSendWay({name,id}))
}

//选中配送类型
export const sendSelectType = (id) => (dispatch, getState)=>{
	let newData = getState().order.shipping_types
	let name= newData.filter(function(item){
		return item.id == id
	})[0].name
	dispatch(changeSendTime({name,id}))
}
