import React, {PureComponent} from 'react';

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
export default class Keyboard1 extends PureComponent {

	handlePassword = (password)=>{
		this.props.changePassword(password)
		browserHistory.push('/MyWallet/PaySet/keyboard2')
	}
	render() {
		return (
			<Keyboard
				title='请设置新密码，用于支付验证'
				onChange = {this.handlePassword}
			/>
		);
	}
}
