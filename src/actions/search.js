import { createActions } from 'redux-actions';
var timer = null
export const { changeShow, changeResultPage, changeValue, changeHistory, changeProductData, changeHotData,changeHistoryData } = createActions(
	'changeShow',
	'changeResultPage',
	'changeValue',
	'changeProductData',
	'changeHotData',
	'changeHistoryData'
)

//改变输入内容
export const handleChange = (value) => (dispatch)=>{
	if(value){
		dispatch(changeResultPage(true))
	}else{
		dispatch(changeResultPage(false))
		dispatch(changeProductData([]))
	}
	dispatch(changeValue(value))
	clearTimeout(timer)
	timer = setTimeout(()=>{
		_fetch(url.home_search,{
			key:value
		})
			.then(({products})=>{
				dispatch(changeProductData(products))
			})
	},500)

}
//清除输入内容
export const clearValue = () => (dispatch)=>{
	dispatch(changeValue(''))
	dispatch(changeResultPage(false))
	dispatch(changeProductData([]))
}

//点击搜索
export const handleHot = (value) => (dispatch)=>{
	dispatch(changeValue(value))
	dispatch(changeResultPage(true))
	dispatch(handleChange(value))
}
//取消按钮
export const handleCancel = () => (dispatch)=>{
	dispatch(changeResultPage(false))
	dispatch(changeProductData([]))
	dispatch(changeValue(''))
	dispatch(changeShow(false))
}
// 清除历史记录
export const deleteHistory = (i) => (dispatch, getState)=>{
	let historyData = getState()._search.historyData
	historyData.splice(i, 1)
	dispatch(changeHistoryData(historyData))
	localStorage.setItem('historyData',JSON.stringify(historyData))
}
// 清除历史记录
export const deleteAllHistory = () => (dispatch, getState)=>{
	let historyData = getState()._search.historyData
	historyData=[]
	dispatch(changeHistoryData(historyData))
	localStorage.setItem('historyData',JSON.stringify(historyData))
}
