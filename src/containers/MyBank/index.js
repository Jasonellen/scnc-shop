import React, {Component} from 'react';
import {SearchBar, Modal, Button, List, InputItem, WingBlank, WhiteSpace} from 'antd-mobile';
import './index.scss'
const Alert = Modal.alert
import { bindActionCreators } from 'redux'
import { browserHistory} from 'react-router'
import {connect} from 'react-redux';
import * as myBank from '@/actions/myBank.js';
import ReactIScroll  from 'react-iscroll'

class MyBank extends Component {
	constructor(){
		super()
		this.state={
			PopupShow:false
		}
	}
	componentDidMount(){
		//获取所有银行卡列表
		this.getBankData('')
		//更新银行卡信息   如果未绑定 进来就是空
		const { bank_cards} = this.props.other
		if(bank_cards.length){
			const {name, bank_type_name, bank_type, card_no} = bank_cards[bank_cards.length-1]
			this.props.changeBankName(name)
			this.props.changeCard({bank_type_name, bank_type})
			this.props.changeCardNumber(card_no)
		}
	}
	getBankData = (text)=>{
		_fetch(url.search_bank_types,{search_text:text})
			.then(data=>{
				this.props.changeBankData(data)
			})
	}
	// 卡类型点击
	handleSelectCard = ()=>{
		this.setState({PopupShow:true}, ()=>{
			document.querySelector('input[type=search]').focus()
		})

	}
	//银行卡列表点击
	handleChangeCard = (item)=>{
		this.props.changeCard(item)
		setTimeout(()=>{
			this.setState({PopupShow:false})
		},0)
	}

	//提交
	handleSubmit = ()=>{
		const{typeId,card,cardNumber} = this.props.state
		if(!typeId || !card || !cardNumber){
			Alert('','请选择卡类型')
			return;
		}
		_fetch(url.update_bank_card,{
			bank_type:typeId,
			bank_type_name:card,
			card_no:cardNumber
		},'FORM')
			.then(data=>{
				if(data.success){
					Alert('','银行卡绑定成功',[
						{
							text: '确定',
							onPress: () => browserHistory.push('/MyWallet'),
						},
					])
				}else{
					Alert('','银行卡绑定失败')
				}
			})
	}

	render() {
		const {modal, name, card, cardNumber, bankData } = this.props.state
		const {PopupShow} = this.state
		return (
			<div className="MyBank">
				<WhiteSpace />
				<List>
          <InputItem
            clear
            placeholder="请输入真实姓名"
						value={name}
						onChange={(text)=>this.props.changeBankName(text)}
          >持卡人</InputItem>
        </List>
				<WhiteSpace />
				<List className={card !== '选择卡类型' ? 'card' : ''}>
					<List.Item
						arrow="horizontal"
						extra={card}
						onClick={this.handleSelectCard}
					>
						卡类型
					</List.Item>
        </List>
				<WhiteSpace />
				<List>
          <InputItem
            clear
						type='bankCard'
						value={cardNumber}
            placeholder="请输入卡号"
						onChange={(text)=>this.props.changeCardNumber(text)}
          >银行卡号</InputItem>
        </List>
				<WingBlank size="lg">
					<Button
						className={(name && (card != '选择卡类型') && cardNumber) ? 'btn active' : 'btn'}
						disabled={!(name && (card != '选择卡类型') && cardNumber)}
						onClick = {this.handleSubmit}
					>保存</Button>
				</WingBlank>
				<Modal
          transparent
          maskClosable={false}
          visible={modal}
          onClose={this.props.handleModalClose}
          footer={[{ text: '确定', onPress: this.props.handleModalClose}]}
        >
					银行卡更新成功
        </Modal>
        {
					PopupShow && <div className='mySearch'>
							<SearchBar
								placeholder="搜索银行"
								onCancel={()=>setTimeout(()=>{this.setState({PopupShow:false})},200)}
								onChange={(text)=>this.getBankData(text)}
								onBlur={()=>{}}
							/>
							<div className="wrap">
								<ReactIScroll iScroll={IScroll}>
									<List>
									{
										bankData.length>0 && bankData.map((item, i)=>{
											return(
												<List.Item key={i}
													onClick = {()=>this.handleChangeCard(item)}
												>{item.bank_type_name}</List.Item>)
										})
									}
								</List>
								</ReactIScroll>
							</div>
						</div>
        }
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		state:state.myBank,
		other:state.other
	}
};
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(myBank, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(MyBank);
