import React, {Component} from 'react';
import {Link} from 'react-router'
import './index.scss'

//图片
import walletPaySuccess from 'static/walletPaySuccess.svg'
import walletPayFail from 'static/walletPayFail.svg'

class WalletPayResult extends Component {
	constructor(props){
		super(props)
		this.state = {
			paySuccess: false
		}
	}
	render() {
		const paySuccess = this.props.location.state
		return (
			<div className="WalletPayResult">
				{
					paySuccess
					?
					<div className="pay">
						<img src={walletPaySuccess} alt=""/>
						<p>支付成功</p>
						<Link to='/'>
							<div>返回我的钱包</div>
						</Link>
					</div>
					:
					<div className="pay">
						<img src={walletPayFail} alt=""/>
						<p>支付失败</p>
							<Link
								to='/MyWallet/WalletFull'
							>
								<div>返回钱包充值</div>
							</Link>
					</div>
				}
			</div>
		);
	}
}

export default WalletPayResult;
