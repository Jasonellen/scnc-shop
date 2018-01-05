import { handleActions } from 'redux-actions';

let initialState = {
	sendWayData:[], //快递方式picker
	name:'请选择',
	shipping_id:'',
	ship_no:'',
	data:'',
	logo:'',
	hasLogistic:false,
	list:[],
	status:'',
}

const cart = handleActions({
	setSendWayData: (state, action) => ({
		...state,
		sendWayData: action.payload,
	}),
	changeSendWay: (state, action) => ({
		...state,
		name: action.payload.name,
		shipping_id: action.payload.id,
		logo:action.payload.logo
	}),
	changeNo: (state, action) => ({
		...state,
		ship_no: action.payload,
	}),
	changeData: (state, action) => ({
		...state,
		data: action.payload,
	}),
	hasLogistic: (state, action) => ({
		...state,
		hasLogistic: action.payload,
	}),
	changeTraces: (state, action) => ({
		...state,
		list: action.payload,
	}),
	changeStatus: (state, action) => ({
		...state,
		status: action.payload,
	})

	
}, initialState);


export default cart;
