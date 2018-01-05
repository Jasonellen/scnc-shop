import React, {Component} from 'react';
import './index.scss'
import { Link} from 'react-router'
import ReactIScroll  from 'react-iscroll'
//图片
import dealSuccess from 'static/dealSuccess.svg'

export default class DealSuccess extends Component {
	constructor(){
		super()
		this.state={
			recommends:[]
		}
	}
	componentDidMount(){
		let data = this.props.location.state
		//获取推荐数据
		_fetch(url.recommend(data.order_items[0].item_id || data.order_items[0].product_id))
			.then((data)=>{
				this.setState({recommends:data.recommends.products})
			})
	}

	render() {
		const {recommends} =this.state
		let data = this.props.location.state
		return (
			<div className="DealSuccess">
				<div className="warp">
					<ReactIScroll iScroll={IScroll}>
					<div>
						<div className='head'>
							<div className="top">
								<img src={dealSuccess} alt=""/>
								<span>交易成功，感谢您对我们的信任与支持！</span>
							</div>
							<div className="bottom">
								<Link
									to={{pathname:'/Evaluate', query:{list:JSON.stringify(data.order_items),order_no:data.order_no}}}>
									<span className='active'>立即评价</span></Link>
								<Link to={`/OrderDetail/${data.order_no}`}><span>订单详情</span></Link>

							</div>
						</div>
						<div className="body">
							<div className="gap">
								—————
								<img src="/static/recommend.svg" alt=""/>
								<span className='recommends'>推荐</span>
								—————
							</div>
							<ul className="body clearfix">
								{
									recommends.map(function(item, index){
										return 	<li className='pull-left' key={index}>
															<Link to={`/GoodsDetail/${item.id}`}>
																<img src={item.image_url} alt=""/>
																<h3>{item.name}</h3>
																<p className='clearfix'>
																	<span className='pull-left'>￥160.0</span>
																	<span className='pull-right'>{item.purchases_count}人已购买</span>
																</p>
															</Link>
														</li>
									})
								}
							</ul>
						</div>
						<Link
							to='/'
							className="back">返回我的</Link>
						</div>
					</ReactIScroll>
				</div>
			</div>
		);
	}
}
