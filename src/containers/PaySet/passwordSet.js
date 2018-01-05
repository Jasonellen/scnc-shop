import React, {Component} from 'react';
import { Modal, Button, WingBlank, InputItem, Toast} from 'antd-mobile';
const Alert = Modal.alert;
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';
import './index1.scss'

import yanzhenshouji from 'static/yanzhengshoujihao.svg'

@connect(
	state => {
		return {
			state:state.other
		}
	}
)
export default class PasswordSet extends Component {
	constructor(props){
		super(props)
		this.state = {
			disabled: true,
			sendMsg:'获取验证码',
			sendClick:true,
			validata:'',
		}
		this.timer = null;
	}
	componentWillUnmount(){
		clearInterval(this.timer)
	}
	//发送短信
	sendMsg = () =>{
		const {mobile} = this.props.state.user
		const {sendClick} = this.state
		if(!sendClick) return;
		_fetch(url.send_code,{mobile})
			.then(data=>{
				if(data.success){
					Toast.success('验证码已发送',1);
					let n = 59;
					this.setState({
						sendMsg:`重新发送(59)`, sendClick:false
					})
					clearInterval(this.timer)
					this.timer = setInterval(()=>{
						n--
						this.setState({
							sendMsg:`重新发送(${n})`
						})
						if(n == 0){
							this.setState({
								sendMsg:'重新发送', sendClick:true
							})
							clearInterval(this.timer)
						}
					}, 1000)
				}else{
					Toast.success('验证码发送失败',1);
				}
			})
	}
	//验证
	handleValidata = (data)=>{
		let validata = /^\d{4,6}$/;
		this.setState({
			validata:data
		})
		if(validata.test(data)){
			this.setState({
				disabled:false
			})
		}else{
			this.setState({
				disabled:true
			})
		}
	}
	handleNext=()=>{
		this.setState({
			sendMsg:'重新发送', sendClick:true
		})
		clearInterval(this.timer)
		const {mobile} = this.props.state.user
		const {validata} = this.state
		_fetch(url.binding_mobile,{mobile, code:validata},'FORM')
			.then(data=>{
				if(data.success){
					browserHistory.push('/MyWallet/PaySet/Keyboard1')
				}else{
					Alert('', '验证码错误')
				}
			})
	}
	render() {
		const {disabled, validata, sendMsg} = this.state
		const {mobile} = this.props.state.user
		return (
			<div className="PaySet">
				<div className="PasswordSet">
					<div className="head">
						<img src={yanzhenshouji} alt=""/>
					</div>
					<div className="body">
						<div className="tel clearfix">
							<div className="pull-left">手机号</div>
							<div className="pull-left num">{mobile}</div>
							<span className="pull-left brief">已绑定</span>
						</div>
						<InputItem
							placeholder="请输入验证码"
							maxLength={6}
							value={validata}
							onChange={this.handleValidata}
							extra={
								<span
									className='sendMsg'
									onClick={this.sendMsg}>{sendMsg}
								</span>
							}
						>验证码</InputItem>
					</div>
					<WingBlank size="lg">
						<Button
							className={`btn ${!disabled && 'active'}`}
							disabled={disabled}
							onClick={this.handleNext}
						>立即验证</Button>
					</WingBlank>
				</div>
			</div>
		);
	}
}
