import { handleActions } from 'redux-actions';

let initialState = {
	disabled: true,
	sendMsg:'发送验证码',
	sendClick:true,
	mobile:'',
	password:'',
	_password:false,
	code:'',
	_validata:false,
	reset:false
}
const bindAccount = handleActions({
	changeSingleData: (state, action) => ({
		...state,
		[action.payload.key]: action.payload.value
	})
}, initialState);


export default bindAccount;
