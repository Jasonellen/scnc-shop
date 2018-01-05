import React, {Component} from 'react';
import './index.scss';
import { Modal, WhiteSpace, List, Picker, TextareaItem} from 'antd-mobile';
const Alert = Modal.alert
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import {Link, browserHistory} from 'react-router'
import * as orderAction from '@/actions/order.js';
import Address from '@/components/Address'
import ReactIScroll  from 'react-iscroll'
import checkout from 'static/checkout.png';

@connect(
	state => {
		return {
			state:state.order,
			noAllowed:false
		}
	},
	dispatch => bindActionCreators(orderAction, dispatch)
)
export default class Order extends Component {
	constructor(props){
		super(props)
		this.state={
			data:[]
		}
	}
	componentDidMount(){
		//获取前数据列表
		_fetch(url.pre_order,{items:this.props.params.items},'FORM')
			.then(data=>{
				this.setState({
					data:data.order_item
				})
				let amount = 0
				data.order_item.map(function(item){
					amount += item.price * item.quantity
				})
				this.props.changePrice(amount) //设置总金额
			})
		//获取地址信息
		_fetch(url.addresses)
			.then((data)=>{
				if(data && data.addresses && data.addresses.length>0){
					let address = data.addresses.find(function(item){
						return item.status == '1'
					})
					this.props.setAddress(address)
				}else{
					this.hasAddress()
				}
			})
		//获取快递方式
		_fetch(url.shippings)
			.then((data)=>{
				this.props.initialShippings(data)
				this.getTypes(data[0].id)
			})

	}

	//获取配送类型
	getTypes = (id)=>{
		_fetch(url.shipping_types,{id})
			.then((data)=>{
				this.props.initialShipping_types(data)
			})
	}

	hasAddress = ()=>{
		Alert('', '您还没有收货地址，是否现在添加?', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{
				text: '现在添加',
				onPress: () => {
					browserHistory.push("/addAddress");
				},
			},
		])
	}

	handleSelectWay = (data)=>{
		this.props.sendSelect(data[0])
		this.getTypes(data[0])
	}

	//提交订单
	handleSubmit =()=>{
		if(this.state.noAllowed){
			Modal.alert('','请勿重复提交订单')
		}else{
			const {shipping_id, shipping_type_id, memo, amount, addresses} = this.props.state
			if(!addresses.id){
				Modal.alert('','请先填写收获地址')
			}else if(!shipping_id){
				Modal.alert('','请先填写配送方式')
			}else if(!shipping_type_id){
				Modal.alert('','请先填写配送时间')
			}else{
				this.setState({noAllowed:true},()=>{
					_fetch(url.orders,{
						amount,
						order_items:JSON.stringify(this.state.data),
						shipping_id,
						shipping_type_id,
						memo,
						address_id:addresses.id
					},'FORM')
						.then(data=>{
							if(data.success){
								browserHistory.push(`/orderBuy/${data.order_no}`)
							}else{
								Modal.alert('','订单提交失败，请重新提交',[
									{
										text: '确定',
										onPress: () => {
											this.setState({noAllowed:false})
										},
									}
								])
							}
						})
				})
			}
		}
		
	}

	render() {
		const {
			sendWay, sendTime, sendWayData, sendTimeData, addresses, amount,
			shipping_id, shipping_type_id,
		} = this.props.state

		const { data } = this.state
		return (
			<div className='_Order'>
				<div className="OrderWarp">
					<ReactIScroll iScroll={IScroll}>
					<div className="Order">
						{
							addresses && addresses.id
							? <Address
									arrow="horizontal"
									data={addresses}
									click={()=>browserHistory.push('/ManageAddressCanBack')}
								/>
							: <Link onClick={()=>browserHistory.push('/addAddress')}>
									<List.Item arrow="horizontal">请填写收货地址</List.Item>
								</Link>
						}
						<WhiteSpace/>
						<div className="orderList">
							<div className="head">
								<List.Item>订单信息</List.Item>
							</div>
							<ul className="body clearfix">
								{
									data.length>0 && data.map(function(item, i){
										return(
											<li key={i}>
												<div className="pull-left">
													<img src={item.img_url}  alt=""/>
												</div>
												<div className="pull-left right">
													<div>{item.name}</div>
													<p>￥{item.price}<span>x{item.quantity}</span></p>
												</div>
											</li>
										)
									})
								}
							</ul>
						</div>
						<WhiteSpace/>
						<div className="select">
							<div style={{borderBottom:'1px solid #ddd'}}>
								<Picker
									data={sendWayData}
									title="选择配送方式"
									cascade={false}
									extra={sendWay}
									onChange={(data)=>this.handleSelectWay(data)}
								>
									<List.Item arrow="horizontal">配送方式</List.Item>
								</Picker>
							</div>
							<div style={{borderBottom:'1px solid #ddd'}}>
								<Picker
									data={sendTimeData}
									title="选择配送时间"
									cascade={false}
									extra={sendTime}
									onChange={(data)=>this.props.sendSelectType(data[0])}
								>
									<List.Item arrow="horizontal">配送时间</List.Item>
								</Picker>
							</div>
						</div>
						<TextareaItem
							rows={3}
							placeholder="如有特殊需求，在此说明"
							onChange={(text)=>this.props.changeMemo(text)}
						/>
					</div>
					</ReactIScroll>
				</div>
				<div className="tab_bottom clearfix">
					<div className='pull-left'>订单金额：<span>￥{amount}</span></div>
					<div
						className='submit pull-right'
						style={{background:(!shipping_id || !shipping_type_id || !addresses)&&'#ddd'}}
						onClick={this.handleSubmit}
						>
							提交订单<img src={checkout} alt=""/>
					</div>
				</div>
			</div>
		);
	}
}
