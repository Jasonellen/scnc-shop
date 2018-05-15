import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as otherAction from '@/actions/other';
import * as tabBar from '@/actions/tabBar.js';
import * as classifyAction from '@/actions/classify.js';
//图片
import home from 'static/home.svg'
import classify from 'static/classify.svg'
import shop from 'static/shop.svg'
import mine from 'static/mine.svg'

import HomePage from '../HomePage'
import Classify from '../Classify'
import Cart from '../Cart'
import Mine from '../Mine'
import MineDoctor from '../MineDoctor'
import MineRepresent from '../MineRepresent'

class TabBarItem extends Component {
	constructor(props){
		super(props)
		this.state={}
	}
	componentDidMount(){
		if(location.href.indexOf('gerenzhongxin') > 0){
			this.props.tabBarAction.changeSelect('mine')
		}
		//获取二维码
		_fetch(url.get_qrcode_img)
			.then(data =>{
				this.props.otherAction.changeCode(data.img_url)
			})

		//取消loading
		setTimeout(()=>{
			var preload = document.getElementById('preload')
			if(preload)preload.style.display = 'none';
		},0)

		this.getUserInfo()
		this.getNoReadOrder()
		this.getNoReadMsg()
		this.getOrderNumber('pending')
		this.getOrderNumber('paid')
		this.getOrderNumber('shipping')
		this.getOrderNumber('completed')
	}

	homeChange = (sort)=>{
		this.props.tabBarAction.changeSelect('classify')
		this.props.classifyAction.changeShowTab(sort)
	}

	//获取我的订单
	getOrderNumber = (status)=>{
		_fetch(url.myOrder,{status})
			.then(data=>{
				if(status === 'pending'){
					this.setState({pendingCount:data.orders.length})
				}
				if(status === 'paid'){
					this.setState({paidCount:data.orders.length})
				}
				if(status === 'shipping'){
					this.setState({shippingCount:data.orders.length})
				}
				if(status === 'completed'){
					this.setState({completedCount:data.orders.length})
				}
			})
	}
	//获取未读消息
	getNoReadMsg = ()=>{
		_fetch(url.my_relation_msg_counts)
			.then(({unread_message}) =>{
				this.setState({unread_message})
			})
	}
	//获取未读推荐订单
	getNoReadOrder = ()=>{
		_fetch(url.my_recommend_order_counts)
			.then(({unread_message}) =>{
				this.setState({unread_message_order:unread_message})
			})
	}
	//获取用户信息
	getUserInfo = ()=>{
		_fetch(url.userInfo)
			.then(data =>{
				this.props.otherAction.changeUser(data)
			})
	}
	componentWillUnmount(){
		//重写组件的setState方法，直接返回空
		this.setState = ()=>{
			return false;
		};
	}
	render() {
		const {selectedTab} = this.props.state
		const {user} = this.props.other
		const {user_type, login_status, login_flag} = user
		return (
			<TabBar
				unselectedTintColor="#565656"
				tintColor="#588fff"
				barTintColor="white"
			>
				<TabBar.Item
					title="首页"
					key="首页"
					icon={
						<div
							style={{
								width: '0.66rem',
								height: '0.66rem',
								background: `url(${home}) center center /  0.66rem 0.66rem no-repeat`}}
						/>
					}
					selectedIcon={
						<div
							style={{
								width: '0.66rem',
								height: '0.66rem',
								background: `url(${home}) center center /  0.66rem 0.66rem no-repeat`
							}}
						>
							<img src={`static/home1.svg?${new Date().getTime()}`}  width='100%' height='100%' alt=""/>
						</div>
					}
					selected={selectedTab === 'home'}
					onPress={() => this.props.tabBarAction.changeSelect('home')}
				>
					<HomePage onMoreChange = {this.homeChange}/>
				</TabBar.Item>
				<TabBar.Item
					icon={
						<div
							style={{
								width: '0.66rem',
								height: '0.66rem',
								background: `url(${classify}) center center /  0.6rem 0.6rem no-repeat`}}
						/>
					}
					selectedIcon={
						<div
							style={{
								width: '0.66rem',
								height: '0.66rem',
								background: `url(${classify}) center center /  0.6rem 0.6rem no-repeat`
							}}
						>
							<img src={`static/classify1.svg?${new Date().getTime()}`}  style={{width:'0.6rem','marginTop':'0.03rem'}} alt=""/>
						</div>
					}
					title="分类"
					key="分类"
					selected={selectedTab === 'classify'}
					onPress={() => this.props.tabBarAction.changeSelect('classify')}
				>
					<Classify/>
				</TabBar.Item>

				<TabBar.Item
					icon={
						<div
							style={{
								width: '0.66rem',
								height: '0.66rem',
								background: `url(${shop}) center center /  0.66rem 0.66rem no-repeat`}}
						/>
					}
					selectedIcon={
						<div
							style={{
								width: '0.66rem',
								height: '0.66rem',
								background: `url(${shop}) center center /  0.66rem 0.66rem no-repeat`
							}}
						>
							<img src={`static/shop1.svg?${new Date().getTime()}`}  width='100%' height='100%' alt=""/>
						</div>
					}
					title="购物车"
					key="购物车"
					selected={selectedTab === 'shop'}
					onPress={() => this.props.tabBarAction.changeSelect('shop')}
				>
					<Cart toHome={() => this.props.tabBarAction.changeSelect('home')}/>
				</TabBar.Item>

				<TabBar.Item
					icon={
						<div
							style={{
								width: '0.66rem',
								height: '0.66rem',
								background: `url(${mine}) center center /  0.66rem 0.66rem no-repeat`}}
						/>
					}
					selectedIcon={
						<div
							style={{
								width: '0.66rem',
								height: '0.66rem',
								background: `url(${mine}) center center /  0.66rem 0.66rem no-repeat`
							}}
						>
							<img src={`static/mine1.svg?${new Date().getTime()}`}  width='100%' height='100%' alt=""/>
						</div>
					}
					title="我的"
					key="我的"
					selected={selectedTab === 'mine'}
					onPress={() => this.props.tabBarAction.changeSelect('mine')}
				>
					{
						user_type == 0 || (!!login_flag && !login_status)
						? <Mine {...this.state} user={user}/>
						:	user_type == 1 
								?  <MineDoctor {...this.state} user={user}/>
									: <MineRepresent {...this.state} user={user}/>
					}
				</TabBar.Item>
			</TabBar>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		state:state.tabBar,
		other:state.other
	}
};
const mapDispatchToProps = (dispatch) => {
	return {
		tabBarAction:bindActionCreators(tabBar, dispatch),
		otherAction:bindActionCreators(otherAction, dispatch),
		classifyAction:bindActionCreators(classifyAction, dispatch)
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(TabBarItem);
