/**
 * Created by mds on 17/11/7.
 */
import React, {Component} from 'react';
import './index.scss';
import {WhiteSpace, WingBlank, Toast, Modal} from 'antd-mobile';
import {Link, browserHistory} from 'react-router'
import ReactIScroll  from 'react-iscroll'
import record from 'static/record.svg'
import recordofconversion from 'static/recordofconversion.svg'
import {connect} from 'react-redux';

@connect(
	state => {
		return {
			state: state.other.user,
		}
	},
	null
)
export default class IntegralMall extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data:[], 
			point_base:0
		}
	}

	componentDidMount() {
		this.getSignInData()
		this.getPointGoodsData()
	}
	//签到
	handleSignIn = ()=>{
		_fetch(url.users_sign_in,{},'FORM')
			.then(data=>{
				if(data.success){
					Toast.info(<h1>签到成功!<br/><small>积分+{data.data}</small></h1>)
				}else{
					Modal.alert('',data.desc)
				}
			})
	}
	//签到基数
	getSignInData = ()=>{
		_fetch(url.users_sign_point_settings)
			.then(data=>{
				if(data.length>0){
					this.setState({
						point_base:data.find(function(item){
							return item.sign_index == 2
						}).sign_point
					})
				}
			})
	}
	//获取积分商品列表
	getPointGoodsData = ()=>{
		_fetch(url.exchange_goods)
			.then(data=>this.setState({data}))
	}

	render() {
		const {data, point_base} = this.state
		const {point} = this.props.state
		return (
			<div className="IntegralMall">
				<ReactIScroll 
					iScroll={IScroll}
					options={{deceleration:0.005}}
				>
					<div>
						<div className="top clearfix">
							<div className="top_head">
								<div className="pull-left" onClick={this.handleSignIn }>
									<h2>签到</h2>
									<p>+{point_base}</p>
								</div>
								<div className="pull-right" onClick={()=>browserHistory.push('/FriendsHelp')}>
									<h2>好友助力</h2>
									<p>领积分</p>
								</div>
							</div>
							<div className="top_foot clearfix">
								<div className="pull-left first">
									<img src={record} alt=''/><span>{point}</span><i>积分</i>
								</div>
								<div className="pull-right" onClick={()=>browserHistory.push('/ExchangeRecord')}>
									<img src={recordofconversion} alt=""/><i>兑换记录</i>
								</div>
							</div>
						</div>
						<div className="hot">
							<WhiteSpace/>
							<div className="head clearfix" >
								<WingBlank size='lg'>
									<div className="pull-left">积分兑好礼</div>
								</WingBlank>
							</div>
							<ul className="body clearfix">
								{
									data.map(function (item) {
										return <li className='pull-left' key={item.id}>
											<Link to={`/MallDetail/${item.id}`}>
												<img src={item.cover} alt=""/>
												<h3>{item.name}</h3>
												<p className='clearfix'>
													<span className='pull-left'>{item.point}<i> 积分</i></span>
													{/*<span className='pull-right'>{item.purchases_count}人已兑换</span>*/}
												</p>
											</Link>
										</li>
									})
								}
							</ul>
						</div>
					</div>
				</ReactIScroll>
			</div>
		);
	}
}
