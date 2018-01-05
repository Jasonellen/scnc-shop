import React, {Component} from 'react';
import { Modal, WhiteSpace, InputItem, WingBlank, Button, Toast} from 'antd-mobile';
const Alert = Modal.alert
import { browserHistory} from 'react-router'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as manageAccount from '@/actions/manageAccount.js';
import './index.scss'

class ManageAccount extends Component {

	handleSendMsg = ()=>{
		const mobile = this.props.state.tel
		if(!mobile){
			Alert('', '请先输入手机号', [
				{text: '确定'}
			])
		}else{
			_fetch(url.send_code,{mobile})
				.then(data=>{
					if(data.success){
						this.props.sendMsg2(data.code)
					}else{
						Toast.success('验证码发送失败',1);
					}
				})
		}
	}

	componentWillUnmount(){
		this.props.handleModalClose()
	}


	handleSubmit=()=>{
		this.props.handleNext()
		const {tel, validata2} = this.props.state
		_fetch(url.binding_mobile,{mobile:tel, code:validata2},'FORM')
			.then(data=>{
				if(data.success){
					Alert('', '更换绑定成功！', [
						{
							text: '确定',
							onPress: () => {
								this.props.handleModalClose()
								setTimeout(()=>{
									browserHistory.push('/')
								},200)
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
	render() {
		const {disabled2, validata2, sendMsg2} = this.props.state
		return (
			<div className="manageAccount">
				<WhiteSpace/>
				<div className='changeBind'>
					<div className="tel">
						<InputItem
							placeholder="请输入要绑定的手机号"
							type='number'
							onChange={this.props.handleTel}
						></InputItem>
					</div>
					<WhiteSpace/>
					<InputItem
						placeholder="请输入验证码"
						maxLength={6}
						value={validata2}
						onChange={this.props.handleValidata2}
						extra={
							<span className='sendMsg'
								onClick={this.handleSendMsg}>{sendMsg2}
							</span>
						}
					>验证码</InputItem>
					<div>
						<WingBlank size="lg">
							<Button
								className={`btn ${!disabled2 && 'active'}`}
								disabled={disabled2}
								onClick={this.handleSubmit}
							>确定绑定</Button>
						</WingBlank>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		state:state.manageAccount
	}
};
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(manageAccount, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
