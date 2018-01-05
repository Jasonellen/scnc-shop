import React, {Component} from 'react';
import './index.scss';
import {WhiteSpace, Flex, List, Badge} from 'antd-mobile';
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux';
import ReactIScroll  from 'react-iscroll'
//图片
import dengdaifukuan from 'static/daifukuan.svg'
import dengdaifahuo from 'static/dengdaifahuo.png'
import dengdaishouhuo from 'static/dengdaishouhuo.pic'
import dengdaipingjia from 'static/dengdaipingjia.png'
import shouhou from 'static/tuikuan.svg'
import shouhuodizhi from 'static/shouhuodizhi.png'
import tuijiandingdan from 'static/tuijiandingdan.png'
import wodeerweima from 'static/wodeerweima.png'
import wodekehu from 'static/wodekehu.png'
import Integral from 'static/Integral.png'


import putonghuiyuan from 'static/putonghuiyuan.png'
import yinpaihuiyuan from 'static/yinpaihuiyuan.png'
import jingpaihuiyuan from 'static/jingpaihuiyuan.png'
import zuanshihuiyuan from 'static/zuanshihuiyuan.png'


@connect(
	state => {
		return {
			user:state.other.user
		}
	}
)
export default class MineDoctor extends Component {
	constructor(props){
		super(props)
		this.state={}
	}
	componentDidMount() {
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
					pendingCount:pendingData.length,
					paidCount:paidData.length,
					shippingCount:shippingData.length,
					completedCount:completedData.length,
				})
			})
	}
	componentWillUnmount(){
		//重写组件的setState方法，直接返回空
		this.setState = ()=>{
			return;
		};
	}
	render() {
		const {user} = this.props
		const { pendingCount,paidCount,shippingCount,completedCount } = this.state
		let img=''
		switch(user.level){
		case 1:
			img = putonghuiyuan;
			break;
		case 2:
			img = yinpaihuiyuan;
			break;
		case 3:
			img = jingpaihuiyuan;
			break;
		case 4:
			img = zuanshihuiyuan;
			break;
		}
		return (
			<div id='MineDoctor'>
				<ReactIScroll iScroll={IScroll}>
				<div className="warp">
					<div className="header">
						<div className="top">
							<div className="head">
								<img src={user.headimageurl || "/static/morentouxiang.png"} alt="" className='head_pic'/>
								<img src={img} alt="" className='badge'/>
								<p>{user.name}</p>
							</div>
							{
								user && user.mobile
									?
									<Link to='/manageAccount'><div className="bind">账号管理</div></Link>
									:
									<Link to='/bindAccount'><div className="bind">绑定账号</div></Link>

							}
						</div>
						<div className="bottom">
							<Flex justify="around">
								<Link to='/myWallet'>
									<i>{parseFloat(user.balance) || 0}</i><br/>
									<span>我的钱包</span>
								</Link>
								<Link to='/MyBonus'>
									<i>{user.point}</i><br/>
									<span>我的积分</span>
								</Link>
								<Link to='/RecommendBonus'>
									<i>{user.recommend_point}</i><br/>
									<span>推荐积分</span>
								</Link>
								<Link to='/MyCollection'>
									<i>{user.collection_count}</i><br/>
									<span>我的收藏</span>
								</Link>
							</Flex>
						</div>
					</div>
					<WhiteSpace/>
					<div className="order">
						<Link to='/myOrder/1'>
							<List className="order-list" >
								<List.Item arrow="horizontal" extra="查看全部订单">我的订单</List.Item>
							</List>
						</Link>
					</div>
					<div className="choice">
						<Flex justify="around" alignContent='center'>
							<Link to='/myOrder/2'>
								<Badge text={pendingCount} overflowCount={99}>
									<img src={dengdaifukuan}  alt=""/>
								</Badge>
								<p>待付款</p>
							</Link>
							<Link to='/myOrder/3'>
								<Badge text={paidCount} overflowCount={99}>
									<img src={dengdaifahuo}  alt=""/>
								</Badge>
								<p>待发货</p>
							</Link>
							<Link to='/myOrder/4'>
								<Badge text={shippingCount} overflowCount={99}>
									<img src={dengdaishouhuo}  alt=""/>
								</Badge>
								<p>待收货</p>
							</Link>
							<Link to='/myOrder/5'>
								<Badge text={completedCount} overflowCount={99}>
									<img src={dengdaipingjia}  alt=""/>
								</Badge>
								<p>待评价</p>
							</Link>
							<Link to='/AfterSale'>
								<img src={shouhou}  alt=""/>
								<p>退款/售后</p>
							</Link>
						</Flex>
					</div>
					<WhiteSpace/>
					<Link to='/MyCustomer'>
						<List className="other_list">
							<List.Item
								thumb={wodekehu}
								onClick={() => {}}
								arrow='horizontal'
							>我的客户</List.Item>
						</List>
					</Link>
					<Link to='/MyQRCode'>
						<List className="other_list">
							<List.Item
								thumb={wodeerweima}
								onClick={() => {}}
								arrow='horizontal'
							>我的二维码</List.Item>
						</List>
					</Link>
					<Link to='/RecommendOrder'>
						<List className="other_list">
							<List.Item
								thumb={tuijiandingdan}
								arrow='horizontal'
								onClick={() => {}}
							>推荐订单</List.Item>
						</List>
					</Link>
					<List className="other_list" style={{border:'none'}}>
						<List.Item
							thumb={shouhuodizhi}
							arrow='horizontal'
							onClick={() => browserHistory.push('/manageAddress')}
						>收货地址</List.Item>
					</List>
					<List className="other_list" style={{border:'none'}}>
						<List.Item
							thumb={Integral}
							arrow='horizontal'
							onClick={() => browserHistory.push('/ComingSoon')}
						>积分商城</List.Item>
					</List>
				</div>
				</ReactIScroll>
			</div>
		);
	}
}
