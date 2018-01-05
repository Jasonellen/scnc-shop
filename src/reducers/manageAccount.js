import { handleActions } from 'redux-actions';

let initialState = {
	//换绑第一步
	disabled: true,
	sendMsg:'获取验证码',
	sendClick:true,
	validata:'',

	//换绑第二步
	disabled2:true,
	sendMsg2:'获取验证码',
	sendClick2:true,
	validata2:'',
	_validata2:false,
	tel:'',
	_tel:false,

	code:'' //验证码

}
const manageAccount = handleActions({
	changeSingleData: (state, action) => ({
		...state,
		[action.payload.key]: action.payload.value
	})
}, initialState);


export default manageAccount;
