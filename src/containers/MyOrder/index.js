import React, {Component} from 'react';
import { Modal, Tabs, WhiteSpace, Toast} from 'antd-mobile';
const Alert = Modal.alert
import {browserHistory} from 'react-router'
import './index.scss'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as shippingAction from '@/actions/shipping.js';
import UpPull from '@/components/UpPull'
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
			isLoading: false,
			hasMore:true,
			page:0,
		}
	}

	componentDidMount(){
		const {index} = this.state
		setTimeout(()=>{
			if(index == 1){
				this.scroll = new IScroll('.warp1',{
					probeType: 2
				})
				this.setState({
					iscroll:this.scroll
				})
			}

		},500)
		//获取我的订单
		_fetch(url.myOrder,{order_status:1})
			.then(data=>{
				let pendingData = data.orders.filter(function(item){
					return item.aasm_state == 'pending'
				})
				let paidData = data.orders.filter(function(item){
					return item.aasm_state == 'paid'
				})
				let shippingData = data.orders.filter(function(item){
					return item.aasm_state == 'shipping'
				})
				let completedData = data.orders.filter(function(item){
					return item.aasm_state == 'completed'
				})

				this.setState({
					data:data.orders,
					pendingData,
					paidData,
					shippingData,
					completedData,
				},()=>this.handleLoading())
			})

	}

	handleLoading = () => {
		const {hasMore, page, data} = this.state
		if (!hasMore) {
			return;
		}
		this.setState({isLoading: true, page:page+1}, ()=>{
			_fetch(url.myOrder,{page:this.state.page,order_status:0})
				.then(res=>{
					if(res.orders.length>0){
						this.setState({
							data: data.concat(res.orders),
							isLoading: false,
						});
					}else{
						this.setState({hasMore:false, isLoading:false})
					}
				})
		})
	}

	componentDidUpdate(){
		setTimeout(()=>{
			this.scroll&&this.scroll.refresh()
		},0)

	}
	componentWillUnmount(){
		this.scroll = null
	}

	handleTabChange = (i)=>{
		if(i == 1){
			setTimeout(()=>{
				this.scroll = new IScroll(`.warp1`,{
					probeType: 2
				})
				this.setState({
					iscroll:this.scroll
				})
			},0)
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
								location.reload()
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
			isLoading,hasMore,iscroll,index
		} = this.state

		return (
			<div className="MyOrder">
				<Tabs
					defaultActiveKey={index}
					swipeable={false}
					onTabClick = {this.handleTabChange}
				>
					<Tabs.TabPane tab="全部" key='1'>
						<div className="warp warp1">
							<div>
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
											<UpPull
												iscroll = { iscroll }
												hasMore ={hasMore}
												isLoading = {isLoading}
												onLoading = {this.handleLoading}
											/>
										</div>
									: <Blank />
								}
							</div>
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
