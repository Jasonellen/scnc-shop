import React, {Component} from 'react';
import { Icon, Result} from 'antd-mobile';
import { Link } from 'react-router'
import './index.scss'

class OrderPayResult extends Component {
	constructor(){
		super()
		this.state={
			result:false
		}
	}
	render() {

		return (
			<div className="OrderPayResult">
				<div className="result">
					{
						this.state.result
						?
						<div>
							<Result
								img={<Icon type={require('static/icon/walletPaySuccess.svg')} className="icon" />}
								message="恭喜你，你已购买成功!订单会在3个工作日内配送发货"
							/>
							<Link to='/myOrder/1' className='back'>查看订单</Link>
							<Link to='/' className='back next'>继续逛逛</Link>
						</div>
						:
						<div>
							<Result
								img={<Icon type={require('static/icon/walletPayFail.svg')} className="icon" />}
								message="很抱歉支付失败，请再次尝试"
							/>
							<Link className='back'>重新支付</Link>
							<Link to='/' className='back next'>继续逛逛</Link>
						</div>
					}

				</div>

			</div>
		);
	}
}

export default OrderPayResult;
