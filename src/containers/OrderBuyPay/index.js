import React, {Component} from 'react';
import { Modal,Icon, InputItem, WhiteSpace, NoticeBar} from 'antd-mobile';
import {browserHistory} from 'react-router'
import './index.scss'
import Keyboard from '@/components/Keyboard'
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
export default class OrderBuyPay extends Component {
	constructor(props){
		super(props)
		this.state={
			config:{},
			wx:true,
			walletPay:false,
			err:'',
			order_no:props.location.state,
			created_at:'',
			amount:0
		}
	}
	componentDidMount() {
		//首次进入刷新页面
		if(!sessionStorage.getItem('scncHasReload')){
			sessionStorage.setItem('scncHasReload',true)
			location.reload()
		}

		_fetch(url.get_order_info,{order_no:this.props.location.state})
			.then(data=>{
				this.setState({
					amount:data.amount,
					created_at:data.created_at,
				})
			})
		//判断是否是钱包支付
		let walletPay = this.props.state.walletPay;
		if(walletPay){
			this.setState({walletPay:true})
		}else{
			// 判断是否是微信浏览器
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				//是微信  且是微信支付

				if(this.props.state.pay_way_id == '2'){
					Modal.alert('', '使用微信支付',[
						{ text: '取消', onPress: () => console.log('cancel') },
						{ text: '确定', onPress: () => this.wxPay()}
					])
				}else{
					Modal.alert('', '请点击右上角在浏览器中打开完成支付',[
						{ text: '取消', onPress: () => console.log('cancel') },
						{ text: '确定', onPress: () => this.zhifubaoPay()}
					])
				}
			}else{
				this.setState({wx:false}, ()=>{
					Modal.alert('', '请在微信中打开完成支付')
				})
			}
		}
	}

	//微信支付
	wxPay = ()=>{
		const { pay_way_id } =this.props.state
		const { order_no } = this.state
		_fetch(url.create_payment,{
			pay_type:0,
			order_no,
			pay_way_id,
		},'FORM')
			.then(data=>{
				_fetch(url.pay(data.payment_id))
				.then(data=>{
					if(data){
						let config= {
							appId:data.app_id,     //公众号名称，由商户传入
							timeStamp: String(data.timestamp), //时间戳，自1970年以来的秒数
							nonceStr:data.nonce_str, //随机串
							package:data.package,
							signType:"MD5",         //微信签名方式：
							paySign:data.sign//微信签名
						}
						this.setState({
							config,
						},()=>{
							this.props.changeConfig(config)
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
						})
					}
				})
			})
	}
	onBridgeReady = ()=>{
		let config = this.state.config
		WeixinJSBridge.invoke('getBrandWCPayRequest', config,(res)=>{
			if(res.err_msg == "get_brand_wcpay_request:ok" ) {
				this.props.changePaySuccess(true)
				browserHistory.push('/PayResult')
			}else{
				this.props.changePaySuccess(false)
				browserHistory.push('/PayResult')
			}
		});
	}

	//支付宝支付
	zhifubaoPay(){
		const { pay_way_id } =this.props.state
		const { order_no } = this.state
		_fetch(url.create_payment,{
			pay_type:0,
			order_no,
			pay_way_id,
		},'FORM')
			.then(data=>{
				location.href = url.alipay(data.payment_id)
			})
			.catch(err=>alert(err))
	}

	//输入完密码  钱包支付
	handleSubmit = (password) =>{
		const { amount, order_no} =this.state
		_fetch(url.check_pay_password,{password},"FORM")
			.then(data=>{
				if(data.success){
					_fetch(url.use_balance,{
						trade_type:3,
						order_no,
						balance:amount
					},'FORM')
						.then(data=>{
							if(data.success){
								Modal.alert('', '支付成功', [
									{
										text: '确定',
										onPress: () => {
											this.props.changePaySuccess(true)
											browserHistory.push('/PayResult')
										},
									},
								])
							}else{
								Modal.alert("", data.desc)
							}
						})
				}else{
					this.setState({err:'支付密码不正确'})
				}
			})
	}
	componentWillUnmount() {
		sessionStorage.setItem('scncHasReload','')
	}
	render() {
		const { wx, walletPay, err, created_at, amount, order_no } =this.state
		const { pay_way_id} =this.props.state
		return (
			<div className="OrderBuyPay">
				{
					wx && pay_way_id == '1' && (
						<NoticeBar icon={null}>
						请点击右上角，选择在浏览器中打开完成支付<Icon type="koubei-o" />
					</NoticeBar>
					)
				}
				<WhiteSpace />
				<InputItem
					value={order_no}
					editable={false}
				>订单编号：</InputItem>
				<InputItem
					value={created_at.slice(0,16).replace('T', ' ')}
					editable={false}
				>下单时间：</InputItem>
				<InputItem
					className='money'
					value={"￥"+amount}
					editable={false}
				>订单金额：</InputItem>
				{/*<Link to='/PayResult' className='back'>查看支付结果</Link>*/}
				{
					walletPay && (
						<Keyboard
							title='请输入支付密码'
							err={err}
							onChange={this.handleSubmit}
						></Keyboard>
					)
				}

			</div>
		);
	}
}


