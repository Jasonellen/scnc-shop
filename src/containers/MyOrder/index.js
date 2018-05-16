import React, {Component} from 'react';
import { Modal, Tabs, WhiteSpace, Toast} from 'antd-mobile';
const Alert = Modal.alert
import {browserHistory} from 'react-router'
import './index.scss'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as shippingAction from '@/actions/shipping.js';
import DFK from './DFK'
import DFH from './DFH'
import DSH from './DSH'
import DPJ from './DPJ'
import YWC from './YWC'
import Blank from '@/components/Blank'
import ReactIScroll  from 'react-iscroll'
@connect(
	null,
	dispatch => {
		return {
			shippingAction:bindActionCreators(shippingAction, dispatch),
		}
	}
)
export default  class MyOrder extends Component {
	constructor(props){
		super(props)
		this.state = {
			index:props.params.id,
			data:[],
			pendingData:[],//待付款
			paidData:[],//待发货
			shippingData:[],//待收获
			completedData:[],//待评价
			page:1,
		}
	}

	componentDidMount(){
		//获取我的订单
		this.getData('pending')
		this.getData('paid')
		this.getData('shipping')
		this.getData('completed')
		this.getAllData()
	}
	//获取全部订单
	getData = (status)=>{
		_fetch(url.myOrder,{status})
			.then(data=>{
				if(status === 'pending'){
					this.setState({pendingData:data.orders})
				}
				if(status === 'paid'){
					this.setState({paidData:data.orders})
				}
				if(status === 'shipping'){
					this.setState({shippingData:data.orders})
				}
				if(status === 'completed'){
					this.setState({completedData:data.orders})
				}
			})
	}
	getAllData = ()=>{
		_fetch(url.myOrder,{page:1,status:'all'})
			.then(data=>{
				this.setState({data: data.orders})
			})
	}
	//下拉加载
	handleLoading = (iscroll) => {
		if(!iscroll.maxScrollY) return;
		if(!this.fetching && (iscroll.y <= iscroll.maxScrollY )){
			if(this.noMore){
				Toast.info('没有更多数据了！',1);
				return
			}
			const { page, data} = this.state
			this.fetching = true
			this.setState({page:page+1}, ()=>{
				_fetch(url.myOrder,{page:this.state.page,status:'all'})
					.then(res=>{
						if(res.orders.length>0){
							this.fetching = false
							this.setState({data: data.concat(res.orders)});
						}else{
							this.fetching = false
							this.noMore = true
							Toast.info('没有更多数据了！',1);
						}
					})
			})
		}
	}

	//取消订单
	handleCancel = (order_no)=>{
		Alert('', '确定取消该笔订单么?', [
			{ text: '不取消了', onPress: () => console.log('cancel') },
			{
				text: '确定取消',
				onPress: () => {
					_fetch(url.del_order,{order_no},'FORM')
						.then(data=>{
							if(data.success){
								Toast.info('订单取消成功',1)
								this.getAllData()
								this.getData('pending')
							}else{
								Toast.info('取消失败，请稍后再试',1)
							}
						})
				},
			},
		])
	}
	//删除订单
	handleDel = (order_no)=>{
		Alert('', '确定删除该笔订单么?', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{
				text: '确定删除',
				onPress: () => {
					_fetch(url.del_order,{order_no},'FORM')
						.then(data=>{
							if(data.success){
								Toast.info('订单删除成功',1)
								location.reload()
							}else{
								Toast.info('删除失败，请稍后再试',1)
							}
						})
				},
			},
		])
	}


	//确认收货
	handleConfirm=(data)=>{
		let str=''
		let  hasBack = data.order_items.find((item)=>{
			return item.state == 1 || item.state == 2
		})
		if(hasBack){
			str = '您申请退款的商品商家正在处理，确认收货后将关闭退款'
		}else{
			str = '是否已确认收到商品'
		}
		Modal.alert('',str,[
		{ text: '取消', onPress: () => console.log('cancel') },
			{
				text: '确定',
				onPress: () => {
					_fetch(url.confirm_receive,{order_no:data.order_no},'FORM')
						.then(res=>{
							if(res.success){
								browserHistory.push({pathname:'/DealSuccess', state:data})
							}
						})

				},
			}])
	}

	//查看物流
	handleCheckLogistic =(order_no,ship_code,ship_no,name,logo)=>{
		_fetch(url.get_trace,{
			order_no,
			ship_code,
			ship_no
		})
			.then(data=>{
				if(data.res_code == 0){
					this.props.shippingAction.changeShipNo(ship_no)
					this.props.shippingAction.changeList(data.traces)
					this.props.shippingAction.changeName(name)
					this.props.shippingAction.changeLogo(logo)
					this.props.shippingAction.changeStatus(data.status)
					browserHistory.push('/CheckLogistics')
				}else{
					Modal.alert('',data.res_error)
				}
			})
	}
	render() {
		const {
			data,pendingData,paidData,
			shippingData,completedData,
			index
		} = this.state

		return (
			<div className="MyOrder">
				<Tabs
					defaultActiveKey={index}
					swipeable={false}
					onTabClick = {this.handleTabChange}
				>
					<Tabs.TabPane tab="全部" key='1'>
						<div className="warp">
							<ReactIScroll 
								iScroll={IScroll} 
								options={{probeType: 3}}
								onScroll = {this.handleLoading}
							>
							<div>
							{console.log(data,data.length,123)}
								{
									data.length>0
									?	<div>
											{
												data.length>0 && data.map((item,i)=>{
													return (
														<div key={i}>
														{
															item.aasm_state == 'pending' && <DFK
																data = {item}
																key={item.created_at}
																onClick={(order_no)=>this.handleCancel(order_no)}
															/>
														}
														{
															item.aasm_state == 'paid' && <DFH
																data = {item}
															/>
														}
														{
															item.aasm_state == 'shipping' && <DSH
																data = {item}
																handleCheckLogistic={(order_no,code,shipping_no,name,logo)=>this.handleCheckLogistic(order_no,code,shipping_no,name,logo)}
																handleConfirm={(item)=>this.handleConfirm(item)}
															/>
														}
														{
															item.aasm_state == 'completed' && <DPJ
																data = {item}
																handleCheckLogistic={(order_no,code,shipping_no,name,logo)=>this.handleCheckLogistic(order_no,code,shipping_no,name,logo)}
															/>
														}
														{
															item.aasm_state == 'commented' && <YWC
															data = {item}
															handleDel={(order_no)=>this.handleDel(order_no)}
															/>
														}
														</div>
													);
												})
											}
										</div>
									: <Blank />
								}
							</div>
							</ReactIScroll>
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab="待付款" key="2">
						<div className="warp">
							<ReactIScroll iScroll={IScroll}>
								<div>
									{
										pendingData.length>0
										?
											pendingData.map((item, i)=>{
												return (
													<DFK
														key = {i}
														data = {item}
														onClick={(order_no)=>this.handleCancel(order_no)}
													/>
												)
											})
										: <Blank />
									}

								</div>
							</ReactIScroll>
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab="待发货" key="3">
						<div className="warp">
							<ReactIScroll iScroll={IScroll}>
								<div>
									{
										paidData.length>0
											?
											paidData.map((item, i)=>{
												return (
													<DFH
														key = {i}
														data = {item}
													/>
												)
											})
											: <Blank />
									}

								</div>
							</ReactIScroll>
						</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab="待收货" key="4">
							<div className="warp">
								<ReactIScroll iScroll={IScroll}>
									<div>
										{
											shippingData.length>0
												?
												shippingData.map((item, i)=>{
													return (
														<DSH
															key = {i}
															data = {item}
															handleCheckLogistic={(order_no,code,shipping_no,name,logo)=>this.handleCheckLogistic(order_no,code,shipping_no,name,logo)}
															handleConfirm={(item)=>this.handleConfirm(item)}
														/>
													)
												})
												: <Blank />
										}
									</div>
								</ReactIScroll>
							</div>
					</Tabs.TabPane>
					<Tabs.TabPane tab="待评价" key="5">
							<div className="warp">
								<ReactIScroll iScroll={IScroll}>
									<div>
										<WhiteSpace />
										{
											completedData.length>0
												?
												completedData.map((item, i)=>{
													return (
														<DPJ
															key = {i}
															data = {item}
															handleCheckLogistic={(order_no,code,shipping_no,name,logo)=>this.handleCheckLogistic(order_no,code,shipping_no,name,logo)}
														/>
													)
												})
												: <Blank />
										}

									</div>
								</ReactIScroll>
							</div>
					</Tabs.TabPane>
				</Tabs>
			</div>
		);
	}
}
