/**
 * Created by nannan on 2017/10/29.
 */
import React, {Component} from 'react';
import { Modal, WhiteSpace, Toast, List} from 'antd-mobile';
const Alert = Modal.alert
import _Popover from '@/components/Popover'
import {Link, browserHistory} from 'react-router'
import './index.scss'
import Address from '@/components/Address'
import ReactIScroll  from 'react-iscroll'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as drawBackAction from '@/actions/drawBack.js';
import * as shippingAction from '@/actions/shipping.js';
//图片
import daifukuanlogo from 'static/daifukuanlogo.svg'
import yifukuanlogo from 'static/yifukuanlogo.svg'
import jiaoyichenggonglogo from 'static/jiaoyichenggonglogo.svg'
import yifahuologo from 'static/yifahuologo.svg'

@connect(
	null,
	dispatch => {
		return {
			drawBackAction:bindActionCreators(drawBackAction, dispatch),
			shippingAction:bindActionCreators(shippingAction, dispatch)
		}
	}
)
export default  class DaiFuKuan extends Component {
	constructor(){
		super()
		this.state={
			data:{},
			context:'',
			time:''
		}
	}
	componentDidMount(){
		const {order_no } = this.props.params
		_fetch(url.get_order_info,{order_no})
			.then(data=>{
				this.setState({data})
				if(data.state == 'completed' || data.state == 'shipping'){
					this.handleCheckLogistic(order_no,data.ship_code,data.shipment.shipping_no,data.ship_name,data.ship_logo)
				}
			})
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

	handleToDrawBack =(data, item)=>{
		if(data.state == 'shipping'){
			this.props.drawBackAction.changeD(true)
		}
		this.props.drawBackAction.changeOrderNo(this.props.params.order_no)
		this.props.drawBackAction.changeItemId(item.product_property_id)
		this.props.drawBackAction.changePrice(item.price * item.quantity)
		browserHistory.push({pathname:'/DrawBack', state:item})
	}
	handleToDrawBackDetail=(refund_id)=>{
		browserHistory.push(`/DrawbackDetail/${refund_id}`)
	}

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
					_fetch(url.confirm_receive,{order_no:this.props.params.order_no},'FORM')
						.then(res=>{
							data.order_no = this.props.params.order_no
							if(res.success){
								browserHistory.push({pathname:'/DealSuccess', state:data})
							}
						})
				},
			}])
	}
	//删除订单
	handleDel = (order_no)=>{
		Alert('', '确定删除该笔订单么?', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{
				text: '确定',
				onPress: () => {
					_fetch(url.del_order,{order_no},'FORM')
						.then(data=>{
							if(data.success){
								Toast.info('订单删除成功',1)
								browserHistory.goBack()
							}else{
								Toast.info('删除失败，请稍后再试',1)
							}
						})
				},
			},
		])
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

					if(	data.traces && data.traces.length > 0){
						this.setState({
							context:data.traces[0].context,
							time:data.traces[0].time,
						})
					}
				}else{
					Modal.alert('',data.res_error)
				}

			})
	}

	render() {
		const {data,context,time} = this.state
		const { order_no } = this.props.params
		let stateText = ''
		let stateImg = ''
		if(data.state == 'pending'){
			stateText = '待付款'
			stateImg = daifukuanlogo
		}else if(data.state == 'paid'){
			stateText = '买家已付款'
			stateImg = yifukuanlogo
		}else if(data.state == 'completed'){
			stateText = '交易成功'
			stateImg = jiaoyichenggonglogo
		}else if(data.state == 'shipping'){
			stateText = '卖家已发货'
			stateImg = yifahuologo
		}else if(data.state == 'commented'){
			stateText = '交易关闭'
			stateImg = jiaoyichenggonglogo
		}

		return (
			<div className="OrderDetail">
				<div className="warp">
					<ReactIScroll iScroll={IScroll}>
					<div>
						<div className='head'>
							<p>
								<span>订单状态：</span>
								<i>{stateText}</i>
							</p>
							<p>
								<span>订单金额：</span><i className='money'>￥{data.amount}</i>
							</p>
							<p>订单编号：{order_no}</p>
							<p>下单时间：{data.created_at && data.created_at.slice(0,16).replace('T',' ')}</p>
							<img src={stateImg} alt=""/>
						</div>
						<WhiteSpace/>
						{
							(data.state == 'completed' || data.state == 'shipping') && context && (
								<List  className="wuliu">
									<List.Item
										multipleLine
										onClick={()=>	browserHistory.push('/CheckLogistics')}
									>
										{context}
										<List.Item.Brief>{time}</List.Item.Brief>
									</List.Item>
								</List>
							)
						}
						<Address
							data={data}
						/>
						<div className='msg'>买家留言：{data.memo}</div>
						<WhiteSpace/>
						<div className="title clearfix">
							订单信息
						</div>
						<ul className="body clearfix">
							{
								data.order_items && data.order_items.length>0 && data.order_items.map((item,i)=>{
									return(
										<li key={i}>
											<Link>
												<div className="pull-left">
													<img src={item.product_img} alt=""/>
												</div>
												<div className="pull-left right">
													<div>{item.product_name}</div>
													<p>￥{item.price}<span>x{item.quantity}</span></p>
												</div>
													{
														(data.state == 'paid' || data.state == 'shipping') && <div className="backMoneyBtn">
															{
																item.state == -1
																	? <span>无法退款</span>
																	: item.state == 0
																	? <span onClick={()=>this.handleToDrawBack(data, item)}>退款</span>
																	: item.state == 1
																	? <span onClick={()=>this.handleToDrawBackDetail(item.refunds[0].id)}>退款申请中</span>
																	: item.state == 2
																	? <span onClick={()=>this.handleToDrawBackDetail(item.refunds[0].id)}>退款中</span>
																	: item.state == 3
																	? <span onClick={()=>this.handleToDrawBackDetail(item.refunds[0].id)}>退款完成</span>
																	: <span>商家已拒绝</span>
															}
														</div>
													}
													{
														(data.state == 'completed' || data.state == 'commented') && <div className="backMoney">
															{
																item.state == -1
																	? "无法退款"
																	: item.state == 0 || item.state == 1 || item.state == 2
																	? ''
																	: item.state == 3
																	? "退款完成"
																	: "商家已拒绝"

															}
														</div>
													}
											</Link>
										</li>
									)
								})
							}
							<li className='clearfix'>
								<p>商品总价：<span className='pull-right'>￥{data.amount}</span></p>
								<p>运费({data.ship_name})：<span className='pull-right'>￥0.0</span></p>
								<div>订单总价：<span className='pull-right'>￥{data.amount}</span></div>
							</li>
						</ul>
					</div>
					</ReactIScroll>
				</div>
				<div className="bottom clearfix">
					<_Popover>
						<span>咨询</span>
					</_Popover>
					{
						data.state == 'pending'
						?
							<div className="pull-right">
								<div className="cancel" onClick={()=>this.handleCancel(order_no)}>取消订单</div>
								<Link to={`/orderBuy/${order_no}`} className="ok">立即付款</Link>
							</div>
						: data.state == 'paid'
							?
							<div className="pull-right">
								<Link to='/myOrder/3' className="ok">返回我的订单</Link>
							</div>
							: data.state == 'completed'
								?
									<div className="pull-right">
										<Link to='/myOrder/5' className="cancel">返回我的订单</Link>
										<Link to={{pathname:'/Evaluate', query:{list:JSON.stringify(data.order_items),order_no:order_no}}} className="ok">立即评价</Link>
									</div>
								: data.state == 'shipping'
									?
										<div className="pull-right">
											<Link to='/myOrder/4' className="cancel">返回我的订单</Link>
											<div className="ok" onClick={()=>this.handleConfirm(data)}>确认收货</div>
										</div>
									: data.state == ''
										?
											<div className="pull-right">
												<Link onClick={()=>this.handleDel(order_no)} className="ok">删除订单</Link>
											</div>
										: ''

					}

				</div>
			</div>
		);
	}
}
