import React, {Component} from 'react';
import { Button, WingBlank} from 'antd-mobile';
import {browserHistory} from 'react-router'
import './index.scss'

import walletPaySuccess from 'static/walletPaySuccess.svg'
class DepositResult extends Component {

	render() {

		return (
			<div className="DepositResult">
				<div className="head">
					<img src={walletPaySuccess} alt=""/>
					<p>提现申请已提交<br/><small>预计三个工作日内到账</small></p>
				</div>
				<div className="body">
					<div className="bank clearfix">
						<div className="pull-left">银行卡号</div>
						<div className="pull-right">253652367546723575476327</div>
					</div>
					<div className="money clearfix">
						<div className="pull-left">提现金额</div>
						<div className="pull-right">30元</div>
					</div>
				</div>
				<WingBlank size="lg">
					<Button
						className='btn active'
						onClick={()=>{browserHistory.push('/')}}
					>我知道了</Button>
				</WingBlank>
			</div>
		);
	}
}

export default DepositResult
