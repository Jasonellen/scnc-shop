import { handleActions } from 'redux-actions';

let initialState = {
	name: '',
	bankData: [{"bank_type":1,"bank_type_name":"中国银行"},{"bank_type":2,"bank_type_name":"中国超级银行"}],
	card: '选择卡类型',
	typeId:'',
	cardNumber:'',
}
const addAddress = handleActions({
	changeBankName: (state, action) => ({
		...state,
		name: action.payload
	}),
	changeCard: (state, action) => ({
		...state,
		card: action.payload.bank_type_name,
		typeId:action.payload.bank_type
	}),
	changeCardNumber: (state, action) => ({
		...state,
		cardNumber: action.payload
	}),
	changeBankData: (state, action) => ({
		...state,
		bankData: action.payload
	})
}, initialState);


export default addAddress;
