import React, {Component} from 'react';
import { Button, Checkbox, List, WhiteSpace, Switch} from 'antd-mobile';
import { browserHistory } from 'react-router'
import './index.scss'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as orderAction from '@/actions/order.js';
//图片
import yue from 'static/yue.svg'
import wechat from 'static/wechat.svg'
// import zhifubao from 'static/zhifubao.svg'
@connect(
	state => {
		return {
			user:state.other.user
		}
	},
	dispatch => bindActionCreators(orderAction, dispatch)
)
export default class OrderBuy extends Component {
	constructor(props){
		super(props)
		this.state = {
			switchChecked:false,
			zhifuChecked:false,
			weChatChecked:true,
			disabled:false,
			pay_way_id:2,
			amount:0
		}
	}
	componentDidMount() {
		_fetch(url.get_order_info,{order_no:this.props.params.order_no})
			.then(data=>{
				this.setState({
					amount:data.amount
				})
			})
		this.props.changePayType(2) //设置默认微信支付
		const { amount } =this.state
		const { balance} =this.props.user
		if(balance < amount){
			this.setState({disabled:true})
		}
	}
	handleChecked =()=>{
		this.setState({
			switchChecked:!this.state.switchChecked
		})
	}
	zhifuPayChecked =()=>{
		if(!this.state.zhifuChecked){
			this.setState({
				zhifuChecked:true,
				weChatChecked:false,
				pay_way_id:1
			})
			this.props.changePayType(1)
		}
	}
	weChatPayChecked =()=>{
		if(!this.state.weChatChecked){
			this.setState({
				zhifuChecked:false,
				weChatChecked:true,
				pay_way_id:2
			})
			this.props.changePayType(2)
		}
	}

	render() {
		const {switchChecked, weChatChecked, disabled} = this.state
		const { amount } =this.state
		const { balance, set_pay_password } =this.props.user
		return (
			<div className="OrderBuy">
				<div className="title">订单金额：<span>￥{amount}</span></div>
				<WhiteSpace />
				<div className="balance clearfix">
					<div className="pull-left">
						<img src={yue} alt=""/>
						钱包余额<span>(￥{balance || 0})</span>
					</div>
					<div className="pull-right">
						{
							!set_pay_password
							?
								<div className='nopassword'>设置支付密码后可用</div>
							:
								switchChecked
								?
									<div className='context'>使用余额</div>
								:
									<div className='context'>{disabled?'余额不足':'不使用余额'} </div>
						}

						<Switch
							disabled={!set_pay_password || disabled}
							checked={switchChecked}
							onChange={this.handleChecked}
						/>
					</div>
				</div>
				<WhiteSpace />
				<List className="wx">
					<List.Item
						thumb={wechat}
						onClick={!switchChecked && this.weChatPayChecked}
					>微信支付</List.Item>
					<Checkbox
						checked={weChatChecked}
						onChange={!switchChecked ?this.weChatPayChecked:()=>{}}
						disabled={switchChecked}
						/>
				</List>
				{/*<List>
					<List.Item
						thumb={zhifubao}
						onClick={!switchChecked && this.zhifuPayChecked}
					>支付宝支付</List.Item>
					<Checkbox
						checked={zhifuChecked}
						onChange={!switchChecked ? this.zhifuPayChecked:()=>{}}
						disabled={switchChecked}
						/>
				</List>*/}
				<Button
					className='btn active'
					onClick={()=>{
						this.props.changeWalletPay(switchChecked)
						browserHistory.push({pathname:'/OrderBuyPay',state:this.props.params.order_no})
					}}
				>确认支付</Button>
			</div>
		);
	}
}

