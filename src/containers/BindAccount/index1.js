import React, {Component} from 'react';
import { Modal, InputItem, WingBlank, Button, Toast} from 'antd-mobile';
const Alert = Modal.alert
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import { browserHistory} from 'react-router'
import * as bindAccount from '@/actions/bindAccount.js';
import './index.scss'

//图片
import wechat from 'static/wechat.svg'
import _link from 'static/link.svg'
import shanger from 'static/shanger.png'

class BindAccount2 extends Component {
	componentDidMount(){
		this.props.changeData({
			disabled:true,
			reset:false,
			sendMsg:'发送验证码',
			sendClick:true,
		})
	}

	handleSendMsg=()=>{
		const {sendClick, mobile} = this.props.state
		if(!sendClick) return;
		_fetch(url.send_code,{mobile})
			.then(data=>{
				if(data.success){
					this.props.sendMsg()
				}else{
					Toast.success('验证码发送失败',1);
				}
			})
	}
	
	handleSubmit = ()=>{
		this.props.changeData({reset:true})
		// this.props.sendMsg()
		const {mobile, code} = this.props.state
		_fetch(url.binding_user,{mobile, code},'FORM')
			.then(data=>{
				if(data.success){
					Alert('', '手机号码绑定成功！', [
						{
							text: '确定',
							onPress: () => {
								this.props.handleModalClose()
								browserHistory.push('/')
							}
						}
					])
				}else{
					Alert('', '验证码错误', [
						{text: '确定'}
					])
				}
			})
	}
	componentWillUnmount() {
		this.props.handleModalClose()
	}
	render() {
		const {disabled, mobile, sendMsg} = this.props.state
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
				<div className="session2">
					<InputItem
						defaultValue={mobile}
						editable={false}
					>手机号</InputItem>
					<InputItem
						placeholder="请输入验证码"
						maxLength={6}
						onChange={this.props.handleValidata}
						extra={
							<span className='sendMsg'
										style={{ width:sendMsg.length !== 4 && '3.35rem'}}
										onClick={this.handleSendMsg}>{sendMsg}
							</span>
						}
					>验证码</InputItem>
				</div>
				<div>
					<WingBlank size="lg">
						<Button
							className={`btn ${!disabled && 'active'}`}
							disabled={disabled}
							onClick = {this.handleSubmit}
						>确定</Button>
					</WingBlank>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		state:state.bindAccount
	}
};
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(bindAccount, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(BindAccount2);
