import { createActions } from 'redux-actions';
import { Toast} from 'antd-mobile';

let timer = null;
export const { changeSingleData } = createActions(
	'changeSingleData',
)
//改变数据的action
export const changeData = (obj = {})=>(dispatch)=>{
	Object.keys(obj).map(function(key){
		dispatch(changeSingleData({key, value:obj[key]}))
	})
}


/******   换绑第一步  **********/
//发送短信
export const sendMsg = (code) =>(dispatch)=>{
	Toast.success('验证码已发送',1);
	dispatch(changeData({code}))
	let n = 59;
	dispatch(changeData({sendMsg:`重新发送(59s)`, sendClick:false}))
	clearInterval(timer)
	timer = setInterval(()=>{
		n--
		dispatch(changeData({sendMsg:`重新发送(${n}s)`}))
		if(n == 0){
			dispatch(changeData({sendMsg:'重新发送', sendClick:true}))
			clearInterval(timer)
		}
	}, 1000)
}
//输入验证码
export const handleValidata = (data) => (dispatch, getState)=>{
	let code = getState().manageAccount.code
	let validata = /^\d{4,6}$/;
	dispatch(changeData({validata:data}))
	if(validata.test(data) && (data == code)){
		dispatch(changeData({disabled:false}))
	}else{
		dispatch(changeData({ disabled:true}))
	}
}


/******   换绑第二步  **********/
//发送短信
export const sendMsg2 = (code) =>(dispatch, getState)=>{
	Toast.success('验证码已发送',1);
	dispatch(changeData({code}))
	const {sendClick2} = getState().manageAccount
	if(!sendClick2) return;
	let n = 59;
	dispatch(changeData({sendMsg2:`重新发送(59s)`, sendClick2:false}))
	clearInterval(timer)
	timer = setInterval(()=>{
		n--
		dispatch(changeData({sendMsg2:`重新发送(${n}s)`}))
		if(n == 0){
			dispatch(changeData({sendMsg2:'重新发送', sendClick2:true}))
			clearInterval(timer)
		}
	}, 1000)
}

//输入手机号
export const handleTel = (tel) => (dispatch)=>{
	let phone = /^((\+?[0-9]{1,4})|(\(\+86\)))?(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])\d{8}$/;
	if (phone.test(tel)){
		dispatch(changeData({tel, _tel:true}))
	}else{
		dispatch(changeData({_tel:false}))
	}
	dispatch(testDisabled2())
}
//输入验证码2  需要并列验证
export const handleValidata2 = (data) => (dispatch, getState)=>{
	let validata = /^\d{4,6}$/;
	let code = getState().manageAccount.code
	dispatch(changeData({validata2:data}))
	if(validata.test(data) && (data == code)){
		dispatch(changeData({_validata2:true}))
	}else{
		dispatch(changeData({_validata2:false}))
	}
	dispatch(testDisabled2())
}
//检测按钮是否可点   --手机号与验证码
export const testDisabled2 = ()=>(dispatch, getState)=>{
	const {_tel, _validata2} = getState().manageAccount
	if(_tel && _validata2){
		dispatch(changeData({ disabled2:false}))
	}else{
		dispatch(changeData({ disabled2:true}))
	}
}


//检测按钮是否可点    --密码与验证码
export const testDisabled = ()=>(dispatch, getState)=>{
	const {_password1, _password2} = getState().manageAccount
	if(_password1 && _password2){
		dispatch(changeData({ passwordDisabled:false}))
	}else{
		dispatch(changeData({ passwordDisabled:true}))
	}
}

export const handleNext = () => (dispatch)=>{
	clearInterval(timer)
	dispatch(changeData({ sendMsg:'获取验证码'}))
}

export const handleModalClose = () => (dispatch)=>{
	clearInterval(timer)
	dispatch(changeData({ sendMsg:'获取验证码'}))
	dispatch(changeData({ code:''}))
}

