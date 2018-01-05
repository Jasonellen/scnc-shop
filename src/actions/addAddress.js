import { createActions } from 'redux-actions';

export const {
	changeName, changeData, changeTel, changeAddress,
	changeChinaCityId, changeCityCode, changeLabel, clearAll, edit
} = createActions(
	'changeName',
	'changeTel',
	'changeAddress',
	'changeCityCode',
	'changeLabel',
	'clearAll',
	'edit'
)

export const changeLabelData = (arr) => (dispatch, getState) =>{
	let data = getState().addAddress.data
	console.log(data,111)
	let labelArr=[]
	let newPro = data.filter(function(item){
		return item.value == arr[0]
	})[0]
	labelArr.push(newPro.label)

	let newCity = newPro.children.filter(function(item){
		return item.value == arr[1]
	})[0]
	labelArr.push(newCity.label)
	if(arr[2]){
		let newArea = newCity.children.filter(function(item){
			return item.value == arr[2]
		})[0]
		labelArr.push(newArea.label)
	}
	dispatch(changeLabel(labelArr))
	dispatch(changeCityCode(arr[2] || ''))
}
