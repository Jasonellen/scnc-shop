import React, {Component} from 'react';
import { Modal,Button, List, InputItem, WingBlank, WhiteSpace} from 'antd-mobile';
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';
import './index.scss'

@connect(
	state => {
		return {
			state:state.other
		}
	}
)
export default class Deposit extends Component {
	constructor(props){
		super(props)
		this.state = {
			username: props.state.bank_cards[0].name,
			bankCard: props.state.bank_cards[0].card_no,
			money: '',
			max: props.state.balance
		}
	}
	handleMoney =(money)=>{
		//如果输入的第一个是空或者字母直接返回
		if(money && !Number(money) && Number(money) != 0) return;
		//设置最大限制10000
		if(money - this.state.max > 0){
			money = this.state.max
		}
		//控制只能输入一个小数点
		if(money.indexOf('.') !== money.lastIndexOf('.')){
			money = money.slice(0, -1)
		}
		//保留一位小数
		if(money.indexOf('.') > 0){
			money = money.slice(0, money.indexOf('.') + 2)
		}
		//如果输入小数点后一位就去除前面多余的0
		if(money.indexOf('.') == money.length - 2){
			money = parseFloat(money)
		}
		this.setState({money})
	}

	handleSubmit = ()=>{
		_fetch(url.withdraws,{
			amount:this.state.money,
		}, 'FORM')
			.then(data=>{
				if(data.success){
					Modal.alert('', '提现申请已提交', [
						{
							text: '确定',
							onPress: () => browserHistory.push('/MyWallet'),
						},
					])
				}
			})
		// ()=>{browserHistory.push('/MyWallet/DepositResult')}
	}
	render() {
		const {username, bankCard, money, max} = this.state
		return (
			<div className="Deposit">
				<WhiteSpace />
				<List>
          <InputItem
						disabled
						value={username}
						onChange={(text)=>this.props.changeName(text)}
          >提现用户</InputItem>
        </List>
				<WhiteSpace />
				<List>
					<InputItem
						disabled
						type='bankCard'
						value={bankCard}
						onChange={(text)=>this.props.changeName(text)}
					>银行卡号</InputItem>
				</List>
				<WhiteSpace />
				<List>
          <InputItem
            clear
						value={money}
            placeholder={`本次可提现${max}元`}
						onChange={(text)=>this.handleMoney(text)}
          >提现金额</InputItem>
        </List>
				<WingBlank size="lg">
					<Button
						className={ money > 0 ? 'btn active' : 'btn'}
						disabled={money <= 0}
						onClick={this.handleSubmit}
					>提交</Button>
				</WingBlank>
			</div>
		);
	}
}
