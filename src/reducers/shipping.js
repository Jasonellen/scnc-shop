import { handleActions } from 'redux-actions';

let initialState = {
	name: false,
	ship_no: false,
	list:'',
	logo:'',
	status:''
}
const Shipping = handleActions({
	changeShipNo: (state, action) => ({
		...state,
		ship_no: action.payload
	}),
	changeList: (state, action) => ({
		...state,
		list: action.payload
	}),
	changeName: (state, action) => ({
		...state,
		name: action.payload
	}),
	changeLogo: (state, action) => ({
		...state,
		logo: action.payload
	}),
	changeStatus: (state, action) => ({
		...state,
		status: action.payload
	})
}, initialState);


export default Shipping;
