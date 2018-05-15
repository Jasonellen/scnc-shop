import React, {Component} from 'react';
import './index.scss';
import {Modal, InputItem, Icon, Button, Toast} from 'antd-mobile';
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';
import * as otherAction from '@/actions/other';
import { bindActionCreators } from 'redux'
import see from 'static/icon/see.svg'
import nosee from 'static/icon/nosee.svg'
import registerLogo from 'static/registerLogo.png'
// import { setCookie } from '@/service/cookie'
// const AgreeItem = Checkbox.AgreeItem;

@connect(
	null,
	dispatch => bindActionCreators(otherAction, dispatch)
)
export default class Login extends Component {
	state={
		passwordType:true,
		checked:true
	}
	handleChange = ()=>{
		this.setState({
			passwordType:!this.state.passwordType
		})
	}
	handleSubmit = ()=>{
		const { phone,password } = this.state
		if(!phone){
			Modal.alert('','手机号不能为空！')
		}else if(!password){
			Modal.alert('','密码不能为空！')
		}else{
			_fetch(url.users_doctor_login,{username:phone,password}, 'FORM')
				.then(data=>{
					if(data.success == true){
						let old_token = localStorage.getItem('s_token')
						localStorage.setItem('s_token',data.token)
						localStorage.setItem('s_token_old',old_token)
						Toast.info('已切换为营养师',1)
						browserHistory.goBack()
					}else{
						Modal.alert('',data.desc)
					}
				})
		}
	}
	render() {
		const { passwordType} = this.state
		return (
			<div className="loginModal">
				<img className='head' src={registerLogo} alt=""/>
				<InputItem 
					placeholder='请输入用户名'
					clear
					onChange={(phone)=>this.setState({phone})}
				/>
				<InputItem
					placeholder='请输入密码'
					clear
					type={passwordType && 'password'}
					extra={<Icon type={passwordType ? nosee : see}/>}
					onExtraClick={this.handleChange}
					onChange={(password)=>this.setState({password})}
				/>
				{/*<AgreeItem defaultChecked={true} onChange={(e)=>this.setState({checked:e.target.checked})}>记住密码，下次免登</AgreeItem>*/}
				<Button className='submit' type='primary' onClick={this.handleSubmit}>登录</Button>
				<div className='btm'>
					如忘记密码请致电客服：<i style={{color:'#588fff'}}>020-39193239</i>
					{/*<Link to='/Signup'><span className='signup'>注册新账号</span></Link>|*/}
					{/*<Link to='/Forget'><span>忘记密码?</span></Link>*/}
				</div>
			</div>
		);
	}
}
