import React, {PureComponent} from 'react';
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
export default class Keyboard2 extends PureComponent {

	handlePassword = (password)=>{
		let _old = this.props.state.password
		if(_old == password){
			_fetch(url.set_pay_password,{pay_password:password},"FORM")
				.then(data=>{
					if(data.success){
						this.props.changeErr('')
						Toast.info('支付密码设置成功', 1, ()=>{
							browserHistory.push('/')
						})
					}
				})
		}else{
			this.props.changeErr('两次输入不一致，请重新输入')
		}
	}
	render() {
		return (
			<Keyboard
				title='请再次输入以确认'
				err={this.props.state.err}
				onChange = {this.handlePassword}
			/>
		);
	}
}
