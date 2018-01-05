import React, {Component} from 'react';
import { WhiteSpace, InputItem, WingBlank, Button, Toast} from 'antd-mobile';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import * as manageAccount from '@/actions/manageAccount.js';
import './index.scss'

class ManageAccount extends Component {

	handleSendMsg = ()=>{
		const {sendClick} = this.props.state
		const {mobile} = this.props.other.user
		if(!sendClick) return;
		_fetch(url.send_code,{mobile})
			.then(data=>{
				if(data.success){
					this.props.sendMsg(data.code)
				}else{
					Toast.success('验证码发送失败',1);
				}
			})
	}
	handleNext = ()=>{
		this.props.handleNext()
		browserHistory.push('/changeBind2')
	}

	componentWillUnmount(){
		this.props.handleModalClose()
	}
	render() {
		const {disabled, validata, sendMsg} = this.props.state
		const {user} = this.props.other
		return (
			<div className="manageAccount">
				<WhiteSpace/>
				<div className='changeBind'>
					<div className="tel">已绑定手机：{user.mobile}</div>
					<WhiteSpace/>
					<InputItem
						placeholder="请输入验证码"
						maxLength={6}
						value={validata}
						onChange={this.props.handleValidata}
						extra={
							<span className='sendMsg'
								onClick={this.handleSendMsg}>{sendMsg}
							</span>
						}
					>验证码</InputItem>
					<div>
						<WingBlank size="lg">
							<Button
								className={`btn ${!disabled && 'active'}`}
								disabled={disabled}
								onClick={this.handleNext}
							>验证后绑定新手机</Button>
						</WingBlank>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		state:state.manageAccount,
		other:state.other
	}
};
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(manageAccount, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
