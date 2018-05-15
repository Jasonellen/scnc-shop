import React, {Component} from 'react';
import './index.scss';
import {Carousel, WhiteSpace, WingBlank} from 'antd-mobile';
import {Link} from 'react-router'
import Search from '@/components/Search';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import * as orderAction from '@/actions/order.js';
import ReactIScroll  from 'react-iscroll'
//图片
import rexiao from 'static/rexiao.png'
import newsvg from 'static/new.svg'
import _search from 'static/search.svg'
import zhuanjia from 'static/zhuanjia.png'
import jifenshangcheng from 'static/jifenshangcheng.svg'
import cheap from 'static/cheap.svg'

@connect(
	state => {
		return {
			state: state.order,
		}
	},
	dispatch => bindActionCreators(orderAction, dispatch)
)
export default class Index extends Component {
	constructor(props) {
		super(props)
		this.scroll = null
		this.state = {
			products: [],
			banners: [],
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
		_fetch(url.get_banners,{key:'home'})
			.then(data=>{
				this.setState({
					banners: data,
				})
			})
		setTimeout(()=>{
			this.Scroll && this.Scroll.refresh()
		},2000)
	}

	render() {
		const {banners, products} = this.state
		return (
			<div id="home_page">
				<Search ref={i=>this.Search = i} />
				<div className="searchBg" ref='searchBg'></div>
				<div className='searchBar' onClick={()=>this.Search.dispatchProps.changeShow(true)}>
					<img src={_search} alt=""/>
					搜索商品
				</div>
				<div id="warp">
					<ReactIScroll
						ref = {x=>this.Scroll = x}
						iScroll = {IScroll}
					>
						<div className='box'>
							<Carousel
								className="carousel"
								autoplay={true}
								infinite
								easing='easeOutQuad'
								selectedIndex={1}
								autoplayInterval={3000}
								speed={500}
							>
								{
									banners.length > 0 && banners.map((item, i) => (
										<Link to={item.target && `/GoodsDetail/${item.target}`} key={i}><img src={item.img} alt="icon"/></Link>
									))
								}
							</Carousel>
							<WhiteSpace/>
							<div className="bonus clearfix">
								<Link to='/goChat' className="pull-left left">
									<img src={zhuanjia} alt=""/>
									<h2>专家咨询</h2>
									<p>知名专家在线答疑</p>
								</Link>
								<div className="pull-left right clearfix">

									<div className='clearfix first'>
										<Link to='/IntegralMall'>
											<div className="pull-left">
												<img src={jifenshangcheng} alt=""/>
											</div>
											<div className="pull-left content">
												<h2>积分商城</h2>
												<p>好礼兑不停</p>
											</div>
										</Link>
									</div>

									<div className='clearfix'>
										<Link to='/ComingSoon'>
											<div className="pull-left">
												<img src={cheap} alt=""/>
											</div>
											<div className="pull-left content">
												<h2>优惠活动</h2>
												<p>购满即送</p>
											</div>
										</Link>
									</div>
								</div>
							</div>
							<div className="hot">
								<WhiteSpace/>
								<div className="head clearfix" onClick={()=> {
									this.props.onMoreChange && this.props.onMoreChange()
								}}>
									<WingBlank size='lg'>
										<div className="pull-left">
											<img src={rexiao} alt=""/>
											热销产品
										</div>
										<div className="pull-right">
											更多
										</div>
									</WingBlank>
								</div>
								<WhiteSpace/>
								<ul className="body clearfix">
									{
										products.map(function (item, index) {
											if(!item.is_new){
												return <li className='pull-left' key={index}>
													<Link to={`/GoodsDetail/${item.id}`}>
														<img src={item.list_img} alt=""/>
														<h3>{item.name}</h3>
														<p className='clearfix'>
															<span className='pull-left'>{'￥'+ item.price}</span>
															<span className='pull-right'>{item.purchases_count}人已购买</span>
														</p>
													</Link>
												</li>
											}
										})
									}
								</ul>
							</div>

							<div className="hot">
								<WhiteSpace/>
								<div className="head clearfix">
									<WingBlank size='lg'>
										<div className="pull-left">
											<img src={newsvg} alt=""/>
											新品发布
										</div>
									</WingBlank>
								</div>
								<WhiteSpace/>
								<ul className="body clearfix">
									{
										products.map(function (item, index) {
											if(item.is_new){
												return <li className='pull-left' key={index}>
													<Link to={`/GoodsDetail/${item.id}`}>
														<img src={item.list_img} alt=""/>
														<h3>{item.name}</h3>
														<p className='clearfix'>
															<span className='pull-left'>价格待定</span>
														</p>
													</Link>
												</li>
											}
										})
									}
								</ul>
							</div>
						</div>
					</ReactIScroll>
				</div>
			</div>
		);
	}
}
