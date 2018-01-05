import { createActions } from 'redux-actions';

export const {
	setSendWayData, changeSendWay, changeNo,changeData, hasLogistic,
	changeTraces, changeStatus
} = createActions(
	'changeData',
	'setSendWayData', //设置配送方式
	'changeSendWay',  //配送方式picker
	'changeNo',
	'hasLogistic',
	'changeTraces',
	'changeStatus'

)

//初始化配送方式
export const initialShippings = (data) => (dispatch)=>{
	let newData = [[]]
	data.map(function(item){
		newData[0].push({
			label: item.name,
			value: item.name,
		})
	})
	dispatch(setSendWayData(newData))
	dispatch(changeData(data))
}


//选中配送方式
export const sendSelect = (name) => (dispatch, getState)=>{

	let newData = getState().applyBackLogistics.data
	let id= newData.filter(function(item){
		return item.name == name
	})[0].id
	let logo= newData.filter(function(item){
		return item.name == name
	})[0].logo
	dispatch(changeSendWay({name,id,logo}))
}

