import React, {Component} from 'react';
import './index.scss';
import {Modal, InputItem, Button, Toast} from 'antd-mobile';
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux';
import * as otherAction from '@/actions/other';
import { bindActionCreators } from 'redux'


@connect(
	null,
	dispatch => bindActionCreators(otherAction, dispatch)
)
export default class Forget extends Component {
	state={
		secondsText:'获取验证码',
		seconds:59,
	}
	onOff=true
	timer=null
	handleGetCode = ()=>{
		const { phone } = this.state
		if(!phone){
			Modal.alert('','请先输入手机号！')
			return
		}
		if(!this.onOff) return;
		this.onOff = false;
		
		_fetch(url.send_code,{mobile:phone})
			.then(data=>{
				if(data.success){
					Toast.success('验证码发送成功',1);
					this.setState({code:data.code},()=>{
						this.setState({secondsText:`重新获取(${this.state.seconds+1})`},()=>{
							clearInterval(this.timer)
							this.timer=setInterval(()=>{
								if(this.state.seconds === 0){
									this.onOff = true;
									clearInterval(this.timer)
									this.setState({
										seconds:59,
										secondsText:'获取验证码',
									})
								}else{
									this.setState({
										seconds:this.state.seconds - 1,
										secondsText:`重新获取(${this.state.seconds})`
									})
								}
							},1000)
						})
					})
				}else{
					Toast.fail('验证码发送失败',1);
				}
			})
	}
	handleSubmit = ()=>{
		const { phone,code,password } = this.state
		if(!phone){
			Modal.alert('','手机号不能为空！')
		}else if(!code){
			Modal.alert('','验证码不能为空！')
		}else if(!password){
			Modal.alert('','密码不能为空！')
		}else{
			_fetch(url.forgot_password,{ mobile:phone,code,password}, 'FORM')
				.then(data=>{
					if(data.success == true){
						Toast.info('密码修改成功！',1,()=>{
							browserHistory.push('/login')
						})
					}else{
						Modal.alert('',data.desc)
					}
				})
		}
	}
	componentWillUnmount() {
		clearInterval(this.timer)
	}
	render() {
		const { secondsText } = this.state
		return (
			<div className="loginModal Forget">
				<h1>找回密码</h1>
				<InputItem 
					placeholder='请输入手机号码'
					clear
					type='phone'
					onChange={(phone)=>this.setState({phone})}
				/>
				<InputItem
					placeholder='请输入验证码'
					clear
					type='number'
					extra={<div className='yzm'>{secondsText}</div>}
					onExtraClick={this.handleGetCode}
					onChange={(code)=>this.setState({code})}
				/>
				<InputItem 
					placeholder='请设置新密码'
					clear
					onChange={(password)=>this.setState({password})}
				/>
				<Button type='primary' onClick={this.handleSubmit}>完成</Button>
				<div className='btm'><Link to='/login'><span className='signup'>重新登录</span></Link></div>
			</div>
		);
	}
}
