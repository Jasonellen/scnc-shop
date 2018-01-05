import React, {Component} from 'react';
import './index.scss';
import { List, Checkbox, Flex, WingBlank} from 'antd-mobile';
import {Link, browserHistory} from 'react-router'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as walletFullAction from '@/actions/walletFull.js';
//图片
import wechat from 'static/wechat.svg'
// import zhifubao from 'static/zhifubao.svg'

class MyWallet extends Component {

	handleSubmit=()=>{
		const { money, checkMoney, payChecked } = this.props.state
		let  sendMoney = money ? money : checkMoney
		browserHistory.push({pathname:'/MyWallet/WalletPay', state: sendMoney + '*' + payChecked})
	}

	render() {
		const {
			currency, money, payChecked, moneyArr, iptActive
		} = this.props.state
		return (
			<div className="WalletFull">
				<div className="head">
					<Flex justify="around" wrap="wrap">
						{
							moneyArr.map((item, index)=>{
								return (
									<div
										key={index}
										className={item.active && 'active'}
										onClick={()=>this.props.handleMoneyArr(index)}
									>￥{item.price}
									</div>
								)
							})
						}
					</Flex>
					<WingBlank size="lg">
						<input
							className={iptActive && 'active' }
							type='text'
							placeholder='请输入充值金额'
							value={currency + money}
							onChange={this.props.handleMoney}
							onBlur={this.props.handleMoneyBlur}
							onClick={this.props.handleMoneyFocus}
						/>
					</WingBlank>
				</div>
				<div className="bottom">
					{/*<List renderHeader={() => '支付方式'}>
						<List.Item
							thumb={zhifubao}
							onClick={()=>this.props.changePayChecked(1)}
						>支付宝支付</List.Item>
						<Checkbox
							checked={payChecked == 1}
							onClick={()=>this.props.changePayChecked(1)}
							/>
					</List>*/}
					<List className="wx">
						<List.Item
							thumb={wechat}
							onClick={()=>this.props.changePayChecked(2)}
						>微信支付</List.Item>
						<Checkbox
							checked={payChecked == 2}
							onClick={()=>this.props.changePayChecked(2)}
							/>
					</List>
				</div>
				<WingBlank size="lg">
					<Link
						onClick={this.handleSubmit}
						className='btn active'
					>确认支付</Link>
				</WingBlank>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		state:state.walletFull
	}
};
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(walletFullAction, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(MyWallet);
