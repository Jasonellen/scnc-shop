import React, {Component} from 'react';
import {Toast} from 'antd-mobile';
import Keyboard from '@/components/Keyboard'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import * as paySetAction from '@/actions/paySet.js';

@connect(
	state => {
		return {
			state:state.paySet
		}
	},
	dispatch => bindActionCreators(paySetAction, dispatch)
)
export default class Keyboard3 extends Component {

	handlePassword = (password)=>{

		_fetch(url.check_pay_password,{password},"FORM")
			.then(data=>{
				if(data.success){
					this.props.changeErr('')
					Toast.info('原支付密码验证成功', 1, ()=>{
						browserHistory.push('/MyWallet/PaySet/keyboard1')
					})
				}else{
					this.props.changeErr('原支付密码不正确')
				}
			})
	}
	render() {
		return (
			<Keyboard
				title='请输入原支付密码'
				err={this.props.state.err}
				onChange = {this.handlePassword}
			/>
		);
	}
}
