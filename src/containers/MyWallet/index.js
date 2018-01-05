import React, {Component} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import {Modal, WhiteSpace, List} from 'antd-mobile';
const Alert = Modal.alert
import {Link, browserHistory} from 'react-router'
import * as otherAction from '@/actions/other';

//图片
import pay_record from 'static/pay_record.svg'
import bank from 'static/bank.svg'
import pay_password from 'static/pay_password.svg'


@connect(
	state => {
		return {
			state:state.other
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch)
)
export default class MyWallet extends Component {

	componentDidMount(){
		//获取钱包余额
		_fetch(url.balance)
			.then(data=>{
				this.props.changeBalance(data.balance)
			})
		//获取我的银行卡
		_fetch(url.bank_cards)
			.then(bank_cards=>{
				this.props.changeBankCards(bank_cards)
			})
	}
	TiXian = ()=>{
		const {balance, bank_cards} =this.props.state
		if(balance == 0) return;
		//判断是否已绑定银行卡
		if(bank_cards.length == 0){
			Alert('', '提现前请先绑定银行卡', [
				{ text: '取消', onPress: () => console.log('cancel') },
				{
					text: '立即绑定',
					onPress: () => browserHistory.push('/MyWallet/MyBank'),
				},
			])
		}else{
			browserHistory.push('/MyWallet/Deposit')
		}
	}
	//点击支付密码，先判断是否绑定，再判断是否已设置
	handlePaySet = ()=>{
		const {user} = this.props.state
		if(user.mobile){
			if(user.set_pay_password){
				browserHistory.push('/MyWallet/PaySet')
			}else{
				browserHistory.push('/MyWallet/PaySet/Keyboard1')
			}
		}else{
			Alert('', '绑定账号后才可以设置您的支付密码', [
				{ text: '取消', onPress: () => console.log('cancel') },
				{
					text: '立即绑定',
					onPress: () => browserHistory.push('/BindAccount'),
				},
			])
		}
	}
	render() {
		const {balance, bank_cards} =this.props.state
		return (
			<div className="MyWallet">
				<div className="head">
					<div className='money'>{balance || 0}</div>
					<p>账户余额(元)</p>
					<div className='btn clearfix'>
						<Link to='/MyWallet/WalletFull' className='pull-left'>充值</Link>
						<div  className={balance == 0 ?'pull-right weak':'pull-right'} onClick={this.TiXian}>提现</div>
					</div>
				</div>
				<WhiteSpace/>
				<Link to='/myWallet/MyBank'>
					<List className="other_list">
						<List.Item
							thumb={bank}
							onClick={() => {}}
							extra={bank_cards.length>0?'已绑定':"未添加"}
							arrow="horizontal"
							>我的银行卡</List.Item>
					</List>
				</Link>
				<WhiteSpace/>
				<Link to='/myWallet/TradingRecord'>
					<List className="other_list">
						<List.Item
							thumb={pay_record}
							arrow="horizontal"
							>交易记录</List.Item>
					</List>
				</Link>
				<WhiteSpace/>
				<List className="other_list">
					<List.Item
						thumb={pay_password}
						arrow="horizontal"
						onClick={this.handlePaySet}
						>支付密码</List.Item>
				</List>
				<Link
					to='/'
					className="back">返回我的</Link>
			</div>
		);
	}
}
