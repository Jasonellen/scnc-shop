import { createActions } from 'redux-actions';
import { browserHistory} from 'react-router'

export const { setAddress} = createActions(
	'setAddress',
)
export const setDefault =(id)=>(dispatch, getState)=>{
	let data = getState().manageAddress.addressData
	data.map(function(item){
		if(item.id == id){
			item.status = '1'
		}else{
			item.status = '0'
		}
	})
	dispatch(setAddress(data))
}
export const setDefaultAndBack =(id)=>(dispatch)=>{
	dispatch(setDefault(id))
	browserHistory.goBack()
}
export const delAddress =(id)=>(dispatch, getState)=>{
	let data = getState().manageAddress.addressData.filter(function(item){
		return item.id != id
	})
	dispatch(setAddress(data))
}
