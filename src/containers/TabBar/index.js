import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as otherAction from '@/actions/other';
import * as tabBar from '@/actions/tabBar.js';
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

	componentDidMount(){
		if(location.href.indexOf('gerenzhongxin') > 0){
			this.props.tabBarAction.changeSelect('mine')
		}
		//获取用户信息
		_fetch(url.userInfo)
			.then(data =>{
				this.props.otherAction.changeUser(data)
			})
		setTimeout(()=>{
			var preload = document.getElementById('preload')
			if(preload)preload.style.display = 'none';
		},0)
	}
	shouldComponentUpdate(nextProps) {
		return this.props == nextProps ? false : true
	}

	render() {
		const {selectedTab} = this.props.state
		const {user_type} = this.props.other.user
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
					<HomePage onMoreChange = {()=>this.props.tabBarAction.changeSelect('classify')}/>
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
						user_type == 1
							? <MineDoctor />
							: user_type == 3 
								? <MineRepresent />
								: <Mine />
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
		otherAction:bindActionCreators(otherAction, dispatch)
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(TabBarItem);
