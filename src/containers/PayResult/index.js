import React, {Component} from 'react';
import {Link} from 'react-router'
import './index.scss'
//图片
import paySuccessImg from 'static/paySuccess.svg'
import payFail from 'static/payFail.svg'

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as orderAction from '@/actions/order.js';

@connect(
	state => {
		return {
			state:state.order,
		}
	},
	dispatch => bindActionCreators(orderAction, dispatch)
)
export default class PayResult extends Component {

	handlePay = () =>{
		// 调用微信接口
		if (typeof WeixinJSBridge == "undefined"){
			if( document.addEventListener ){
				document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
			}else if (document.attachEvent){
				document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
				document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
			}
		}else{
			this.onBridgeReady();
		}
	}

	onBridgeReady = ()=>{
		const {config} = this.props.state
		WeixinJSBridge.invoke('getBrandWCPayRequest', config,(res)=>{
			if(res.err_msg == "get_brand_wcpay_request:ok" ) {
				this.props.changePaySuccess(true)
			}else{
				this.props.changePaySuccess(false)
			}
		});
	}


	render() {
		const { paySuccess } =this.props.state
		return (
			<div className="PayResult">
				{
					paySuccess == true
					?
					<div className="paySuccess">
						<img src={paySuccessImg} alt=""/>
						<p>恭喜你，您已购买成功！订单会在3个工作日配送发货</p>
						<Link to='/myOrder/1'><div className='toOrder'>查看订单</div></Link>
						<Link to='/'><div>继续逛逛</div></Link>
					</div>
					:
					<div className="payFail">
						<img src={payFail} alt=""/>
						<p>很抱歉，支付失败，请再次尝试</p>
						<div className='toOrder' onClick={this.handlePay}>重新支付</div>
						<Link to='/'><div>继续逛逛</div></Link>
					</div>
				}
			</div>
		);
	}
}

