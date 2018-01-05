import React, {Component} from 'react';
import { Icon, InputItem, WhiteSpace, NoticeBar, Modal} from 'antd-mobile';
import {browserHistory} from 'react-router'
import './index.scss'
export default class WalletPay extends Component {
	constructor(){
		super()
		this.state={
			config:{},
			wx:true,
			amount:'',
			pay_way_id:''
		}
	}
	componentDidMount() {
		const parmas = this.props.location.state.split('*')
		const amount = parmas[0]
		const pay_way_id = parmas[1]
		this.setState({
			amount,
			pay_way_id,
		}, ()=>{
			// 判断是否是微信浏览器
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				//是微信  且是微信支付

				if(this.state.pay_way_id == '2'){
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

		})
	}

	wxPay = ()=>{
		const {amount, pay_way_id} =this.state
		_fetch(url.create_payment,{
			pay_type:1,
			amount,
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
			console.log(res, '调用支付结果')
			if(res.err_msg == "get_brand_wcpay_request:ok" ) {
				browserHistory.push({pathname:'/MyWallet/WalletPayResult', state:true})
			}else{
				browserHistory.push({pathname:'/MyWallet/WalletPayResult', state:false})
			}
		});
	}

	//支付宝支付
	zhifubaoPay(){
		const { amount, pay_way_id } =this.state
		_fetch(url.create_payment,{
			pay_type:1,
			amount,
			pay_way_id,
		},'FORM')
			.then(data=>{
				location.href = url.alipay(data.payment_id)
			})
			.catch(err=>alert(err))
	}

	render() {
		const { wx, pay_way_id, amount } =this.state
		return (
			<div className="WalletPay">
				{
					wx && pay_way_id == '1' && (
						<NoticeBar icon={null}>
						请点击右上角，选择在浏览器中打开完成支付<Icon type="koubei-o" />
					</NoticeBar>
					)
				}
				<WhiteSpace />
				<InputItem
					value={pay_way_id == '1' ? '支付宝支付' : '微信支付'}
					editable={false}
				>支付方式：</InputItem>
				<InputItem
					value={new Date().toLocaleString()}
					editable={false}
				>下单时间：</InputItem>
				<InputItem
					className='money'
					value={"￥"+amount}
					editable={false}
				>订单金额：</InputItem>
				{/*<Link to='/PayResult' className='back'>查看支付结果</Link>*/}
				
			</div>
		);
	}
}


