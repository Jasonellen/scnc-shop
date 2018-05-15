import React, {Component} from 'react';
import { InputItem, WingBlank, Button, Toast} from 'antd-mobile';
import {browserHistory} from 'react-router'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as bindAccount from '@/actions/bindAccount.js';
import './index.scss'

//图片
import wechat from 'static/wechat.svg'
import _link from 'static/link.svg'
import shanger from 'static/shanger.png'
 
@connect(
	state => {
		return {
			state:state.other,
			bind:state.bindAccount
		}
	},
	dispatch => bindActionCreators(bindAccount, dispatch)
)
export default class BindAccount extends Component {

	componentDidMount(){
		// this.props.changeData({disabled:true})	
	}
	handleNext=()=>{
		const mobile = this.props.bind.mobile
		_fetch(url.check_mobile,{mobile:mobile})
			.then(data=>{
				if(data.success){
					browserHistory.push('/bindAccount2')
				}else{
					Toast.info(data.desc,1);
				}
			})
	}
	handleExit = ()=>{
		_fetch(url.doctor_logout)
			.then(data=>{
				if(data.success){
					let old_token = localStorage.getItem('s_token_old')
					localStorage.setItem('s_token',old_token)
					browserHistory.goBack()
				}
			})
	}
	render() {
		const {disabled} = this.props.bind
		const { login_status } = this.props.state.user
		return (
			<div className="BindAccount">
				<div className="head clearfix">
					<div className="circle pull-left">
						<img src={wechat} alt=""/>
					</div>
					<img src={_link} alt="" className='link'/>
					<div className="circle pull-right">
						<img src={shanger} alt=""/>
					</div>
				</div>
				<div className="session1">
					<InputItem
						focused
						placeholder="请输入手机号"
						type='number'
						onChange={this.props.handleTel}
						name='input'
					>手机号</InputItem>
				</div>
				<div>
					<WingBlank size="lg">
						<Button
							className={`btn ${!disabled && 'active'}`}
							disabled={disabled}
							onClick={this.handleNext}
						>下一步</Button>
					</WingBlank>
				</div>
				{
					login_status == 1
					?
						<div onClick={this.handleExit} className='login'>退出登录</div>
					: 
						<div onClick={()=>browserHistory.replace('/login')} className='login'>账号登录</div>
				}
				{/*<Link to='/OldAccount' className='old'>我是老用户</Link>*/}
			</div>
		);
	}
}

