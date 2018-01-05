import { createActions } from 'redux-actions';

export const {
	changeSaveComments
} = createActions(
	'changeSaveComments',
)

export const initialSaveComments = (data,order_no) => (dispatch) =>{
	let saveComments = []
	data.map(function(item){
		saveComments.push({
			product_id:item.item_id || item.product_id,
			property_id:item.property_id || item.product_property_id,
			order_no,
			point:5,
			picture:[],
			content:''
		})
	})
	dispatch(changeSaveComments(saveComments))
}

export const changeContent = (product_id, content) => (dispatch, getState) =>{
	let newData = getState().evaluate.save_comments
	newData.map(function(item){
		if(item.product_id == product_id){
			item.content = content
		}
	})
	dispatch(changeSaveComments(newData))
}

export const changePoint = (product_id, point) => (dispatch, getState) =>{
	let newData = getState().evaluate.save_comments
	newData.map(function(item){
		if(item.product_id == product_id){
			item.point = point
		}
	})
	dispatch(changeSaveComments(newData))
}

export const changeFile = (product_id, picture) => (dispatch, getState) =>{
	let newData = getState().evaluate.save_comments
	newData.map(function(item){
		if(item.product_id == product_id){
			item.picture = picture
		}
	})
	dispatch(changeSaveComments(newData))
}
