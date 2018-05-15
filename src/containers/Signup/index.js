import React, {Component} from 'react';
import {Modal, InputItem, Button, Toast} from 'antd-mobile';
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux';
import * as otherAction from '@/actions/other';
import { bindActionCreators } from 'redux'
import './index.scss'

@connect(
	null,
	dispatch => bindActionCreators(otherAction, dispatch)
)
export default class Sign extends Component {
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
			browserHistory.push({pathname: '/signupnext',query:{ mobile:phone,password,code}});
		}
	}
	componentWillUnmount() {
		clearInterval(this.timer)
	}
	render() {
		const { secondsText } = this.state
		return (
			<div className="loginModal Forget">
				<h1>注册新账号</h1>
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
					placeholder='请设置密码'
					clear
					onChange={(password)=>this.setState({password})}
				/>
				<Button type='primary' onClick={this.handleSubmit}>下一步</Button>
				<div className='btm'><Link to='/login'><span className='signup'>重新登录</span></Link></div>
			</div>
		);
	}
}
