/**
 * Created by mds on 17/11/7.
 */
import React, {Component} from 'react';
import './index.scss';
import {WhiteSpace, WingBlank, Toast} from 'antd-mobile';
import {Link} from 'react-router'
import ReactIScroll  from 'react-iscroll'
import record from 'static/record.svg'
import recordofconversion from 'static/recordofconversion.svg'

export default class IntegralMall extends Component {
	constructor(props) {
		super(props)
		this.state = {
			products: [],
		}
	}

	componentDidMount() {

		//请求首页数据
		_fetch(url.home)
			.then(data=> {
				this.setState({
					products: data.products,
				})
			})
	}
	handleSignIn = ()=>{
		Toast.info(<h1>签到成功!<br/><small>积分+5</small></h1>)
	}

	render() {
		const {products} = this.state
		return (
			<div className="IntegralMall">
				<ReactIScroll iScroll={IScroll}>
					<div>
						<div className="top clearfix">
							<div className="top_head">
								<div className="pull-left" onClick={this.handleSignIn }>
									<h2>签到</h2>
									<p>+5</p>
								</div>
								<div className="pull-right">
									<h2>好友助力</h2>
									<p>领积分</p>
								</div>
							</div>
							<div className="top_foot clearfix">
								<div className="pull-left first">
									<img src={record} alt=''/><span>2341</span><i>积分</i>
								</div>
								<div className="pull-right">
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
									products.map(function (item, index) {
										return <li className='pull-left' key={index}>
											<Link to={`/GoodsDetail/${item.id}`}>
												<img src={item.list_img} alt=""/>
												<h3>{item.name}</h3>
												<p className='clearfix'>
													<span className='pull-left'>{item.price}<i> 积分</i></span>
													<span className='pull-right'>{item.purchases_count}人已兑换</span>
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
