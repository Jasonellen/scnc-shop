import { createActions } from 'redux-actions';
import { Toast} from 'antd-mobile';
export const { changeSingleData } = createActions(
	'changeSingleData',
)
//改变数据的action
export const changeData = (obj = {})=>(dispatch)=>{
	Object.keys(obj).map(function(key){
		dispatch(changeSingleData({key, value:obj[key]}))
	})
}

//输入手机号
export const handleTel = (mobile) => (dispatch)=>{
	let phone = /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/;
	if (phone.test(mobile)){
		dispatch(changeData({disabled:false, mobile}))
	}else{
		dispatch(changeData({disabled:true}))
	}
}

let timer = null;
//发送短信
export const sendMsg = () =>(dispatch, getState)=>{
	if(getState().bindAccount.reset){
		clearInterval(timer)
		dispatch(changeData({sendMsg:'重新发送', sendClick:true}))
		return;
	}
	
	Toast.success('验证码已发送',1);
	let n = 59;

	dispatch(changeData({sendMsg:`重新发送(59s)`, sendClick:false}))
	timer = setInterval(()=>{
		n--
		dispatch(changeData({sendMsg:`重新发送(${n}s)`}))
		if(n == 1){
			dispatch(changeData({sendMsg:'重新发送', sendClick:true}))
			clearInterval(timer)
		}
	}, 1000)
}
//输入验证码
export const handleValidata = (data) => (dispatch)=>{
	let validata = /^\d{4,6}$/;
	if(validata.test(data)){
		dispatch(changeData({code:data, _validata:true}))
		dispatch(testDisabled())
	}else{
		dispatch(changeData({ _validata:false, disabled:true}))
	}

}
//设置密码
export const handlePassword = (data) =>(dispatch)=>{
	let password = /^\w{4,6}$/;
	if(password.test(data)){
		dispatch(changeData({password:data, _password:true}))
		dispatch(testDisabled())
	}else{
		dispatch(changeData({ _password:false, disabled:true}))
	}
}
//检测按钮是否可点
export const testDisabled = ()=>(dispatch, getState)=>{
	// const {_password, _validata} = getState().bindAccount
	const { _validata} = getState().bindAccount
	if(_validata){
		dispatch(changeData({ disabled:false}))
	}else{
		dispatch(changeData({ disabled:true}))
	}
}

export const handleModalClose = () => (dispatch)=>{
	clearInterval(timer)
	dispatch(changeData({ sendMsg:'发送验证码'}))
}
