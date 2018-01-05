import { handleActions } from 'redux-actions';
import cities from '@/lib/cities'
let initialState = {
	address_code:'', //区
	detail:'',
	phone: '',
	name:'',
	proLabel:'请选择',
	cityLabel:'',
	areaLabel:'',
	data :cities, //选择器数据
	id:''
}
const addAddress = handleActions({
	changeName: (state, action) => ({
		...state,
		name: action.payload
	}),
	changeTel: (state, action) => ({
		...state,
		phone: action.payload
	}),
	changeAddress: (state, action) => ({
		...state,
		detail: action.payload
	}),
	changeCityCode: (state, action) => ({
		...state,
		address_code: action.payload || ''
	}),
	changeLabel: (state, action) => ({
		...state,
		proLabel:action.payload[0],
		cityLabel:action.payload[1],
		areaLabel:action.payload[2] || '',
	}),
	clearAll: (state) => ({
		...state,
		address_code:'', //区
		detail:'',
		phone: '',
		name:'',
		proLabel:'请选择',
		cityLabel:'',
		areaLabel:'',
	}),
	edit: (state, action) => ({
		...state,
		detail:action.payload.detail,
		phone: action.payload.phone,
		name:action.payload.name,
		proLabel:'',
		address_code:action.payload.address_code,
		cityLabel:action.payload.full_address.split(' ')[0],
		areaLabel:action.payload.full_address.split(' ')[1],
		id:action.payload.id
	})
}, initialState);


export default addAddress;
