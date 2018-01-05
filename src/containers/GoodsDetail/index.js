import React, {Component} from 'react';
import './index.scss';
import {WingBlank, List, Stepper, Carousel, Toast, Modal} from 'antd-mobile';
import _Popover from '@/components/Popover'
import {Link,browserHistory} from 'react-router'
import Score from '@/components/Score'

//图片
import heart from 'static/heart.svg'
import heart1 from 'static/heart1.svg'
import location from 'static/location.svg'
import serve from 'static/serve.svg'

export default class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab:'shangping',
			data:'', //详情数据
			recommends:'', //推荐数据
			quantity:1, //购买商品数量
			product_property_id:'', //规格id
			number:0, //库存数量
			price:'',
			market_price:''
		};
	}

	//监听页面滚动
	componentDidMount(){
		setTimeout(()=>{
			let pingjia = this.refs.pingjia && this.refs.pingjia.offsetTop;
			let xiangqing = this.refs.xiangqing && this.refs.xiangqing.offsetTop;
			let tuijian = this.refs.tuijian && this.refs.tuijian.offsetTop;
			var _this = this
			this.scroll = new IScroll('#warp',{
				probeType: 3,
			})
			this.scroll.on('scroll', function(){
				let t = Math.abs(this.y)
				if(t <= pingjia - 80){
					_this.setState({activeTab:'shangping'})
				}else if(t < xiangqing - 80){
					_this.setState({activeTab:'pingjia'})
				}else if(t < tuijian - 80){
					_this.setState({activeTab:'xiangqing'})
				}else {
					_this.setState({activeTab:'tuijian'})
				}
			});
		},500)

		//获取详情数据
		_fetch(url.products(this.props.params.id))
			.then((data)=>{
				this.setState({
					data,
					product_property_id:data.product.properties[0].id,
					number:data.product.properties[0].quantity,
					price:data.product.properties[0].price,
					market_price:data.product.properties[0].market_price,
				})
			})
		//获取推荐数据
		_fetch(url.recommend(this.props.params.id))
			.then((data)=>{
				this.setState({recommends:data.recommends.products})
			})
	}
	//推荐商品点击
	recommendsClick=(id)=>{
		browserHistory.push(`/GoodsDetail/${id}`)
		global.location.reload()
	}

	componentDidUpdate() {
		setTimeout(()=> {
			this.scroll && this.scroll.refresh()
		}, 0)
	}
	componentWillUnmount(){
		this.scroll = null
		this.setState = function(){
			return false
		}
	}
	//切换规格
	handleGuiGeClick = (id)=>{
		const {properties} = this.state.data.product
		let newData = properties.find(function(item){
			return item.id == id
		})
		this.setState({
			quantity:1,
			price:newData.price,
			market_price:newData.market_price,
			product_property_id:newData.id
		})
	}
	//商品数量改变
	countChange = (quantity) => {
		this.setState({quantity})
	}
	//收藏
	handleCollect = ()=>{
		if(this.state.data.product.is_collect==false){
			_fetch(url.collect(this.props.params.id),{operation:0},'FORM')
				.then((data)=>{
					if(data.success){
						this.state.data.product.is_collect = true
						this.setState({})
					}
				})
		}else{
			_fetch(url.collect(this.props.params.id),{operation:1},'FORM')
				.then((data)=>{
					if(data.success){
						this.state.data.product.is_collect = false
						this.setState({})
					}
				})
		}
	}
	//添加购物车
	addCart = ()=>{
		if(!this.state.number){
			Modal.alert('', '暂无库存')
			return;
		}
		const {product_property_id, quantity} = this.state
		_fetch(url.addCart,{product_property_id,quantity},'FORM')
			.then(data=>{
				if(data){
					Toast.info('加入购物车成功',1);
				}
			})
	}
	//立即购买
	handleSubmit = ()=>{
		if(!this.state.number){
			Modal.alert('', '暂无库存')
			return;
		}
		const {quantity,product_property_id} = this.state
		let items = []
		items.push({
			product_property_id,
			quantity
		})
		browserHistory.push(`/order/${JSON.stringify(items)}`)
	}
	render() {
		const {
			activeTab, product_property_id, recommends,
			number, price, market_price, quantity,data
		} = this.state;
		const {product, promotion} = this.state.data
		let list_data = product && product.list_data
		let detail_data = product && product.detail_data

		return (
			<div className="goods_detail">
				<div className="tab">
					<div className={activeTab == 'shangping' ? 'active' : ''}
						onClick={()=>this.scroll.scrollToElement('.slider',500,0,-80)}
					>
						<img src={location} alt=""/>商品</div>
					<div
						className={activeTab == 'pingjia' ? 'active' : ''}
						onClick={()=>this.scroll.scrollToElement('.comments',500,0,-80)}
					>
						<img src={location} alt=""/>评价</div>
					<div
						className={activeTab == 'xiangqing' ? 'active' : ''}
						onClick={()=>this.scroll.scrollToElement('.details',500,0,-80)}
					>
						<img src={location} alt=""/>详情</div>
					<div
						className={activeTab == 'tuijian' ? 'active' : ''}
						onClick={()=>this.scroll.scrollToElement('.recommends',500,0,-74)}
					>
						<img src={location} alt=""/>推荐</div>
				</div>
				<div id='warp'>
					<div className='box'>
						<Carousel
							className="carousel"
							autoplay={true}
							infinite
							easing='easeOutQuad'
							selectedIndex={0}
							autoplayInterval={3000}
							speed={500}
						>
							{
								product
									?
									list_data && list_data.map((item, i)=>{
										return <a key={i}><img src={item} alt="icon" width="100%" height="100%"/></a>
									})
									: <div></div>
							}
						</Carousel>
						{
							data&&<div className="bgwhite">
								<WingBlank size='lg'>
									<h2 className='price'>
										{!product.is_new && <span className='delprice'>
											<i>原价:￥</i>{market_price}
										</span>}
										{ product.is_new 
											? <span className='first'>
													价格待定
												</span>
											: <span className='first'>
													<i>￥</i>{price}
												</span>
										}
										{!product.is_new && <span className='tag'>会员价</span>}
										{
											promotion && <span className='tag'>{promotion.name}</span>
										}
									</h2>
									<div className="info">
										<h2>{product.name}</h2>
										<p>{product.description}</p>
										{
											product.properties.length>0&&<div>规格：
												{
													product.properties.map((item,i)=>{

														return <span
															key={i}
															onClick={()=>this.handleGuiGeClick(item.id)}
															className={product_property_id == item.id ? 'active' : ''}>{item.value}</span>
													})
												}
											</div>
										}
									</div>
									<div className="count">
										<List>
											<List.Item
												style={{padding:0}}
												extra={
													<Stepper
														style={{width: '100%', minWidth: '2rem'}}
														showNumber
														max={number}
														min={1}
														value={quantity}
														onChange={this.countChange}
													/>}
												wrap
											>
												<span style={{fontSize:'0.427rem'}}>数量：<small>(库存{number}盒)</small></span>
											</List.Item>
										</List>
									</div>
									{
										promotion && <p className="present">
											<span>[{promotion.detail_name}]：</span>{promotion.description}
										</p>
									}
								</WingBlank>

								<div className="gap" ref='pingjia'>
									—————
									<img src="/static/comment.svg" alt=""/>
									<span className='comments'>评论</span>
									—————
								</div>
								<WingBlank size='lg'>
									<div className="comment">
										<div className="head">
											<div>商品评价<small>（{product.comment_size}条评论）</small></div>
											<div className='star'>
												<Score score={product.score || '0'} width = {30/75+"rem"} margin={0.06666667+'rem'}/>
												<span className='fen'>&nbsp;&nbsp;{product.score || 0}分</span>
											</div>
										</div>
										{
											product.comments.length>0 ? (
												<div className="body">
													<p className='first'>
														<span>{(!product.comments[0].anonymous && product.comments[0].username) || '匿名用户'}</span>
														<span>{product.comments[0].created_at.split('T')[0]}</span>
													</p>
													<p>{product.comments[0].content}</p>
													<Link to={`/Evaluation/${this.props.params.id}`}>查看全部评价</Link>
												</div>
											): <p style={{lineHeight:'100px'}}>暂无评价</p>
										}
									</div>
								</WingBlank>
								<div className="gap" ref='xiangqing'>
									—————
									<img src="/static/picinfo.svg" alt=""/>
									<span className='details'>详情</span>
									—————
								</div>
								<ul className='product_show'>
									{
										detail_data.length>0 ? detail_data.map((item, i)=>{
											return <li key={i}><img src={item} alt=""/></li>
										}): <p style={{lineHeight:'100px',paddingLeft:'0.4rem'}}>敬请期待</p>
									}
								</ul>
								<div className="gap" ref='tuijian'>
									—————
									<img src="/static/recommend.svg" alt=""/>
									<span className='recommends'>推荐</span>
									—————
								</div>
								{
									recommends&&<ul className="recommend clearfix">
										{
											recommends.map((item, i)=>{
												return (
													<li key={i} className='pull-left' onClick={()=>this.recommendsClick(item.id)}>
														<img src={item.image_url} alt=""/>
														<h3>{item.name}</h3>
														<p className='clearfix'>
															<span className='pull-left'>{item.is_new ? '价格待定' : '￥'+ item.price}</span>
															{!item.is_new && <span className='pull-right'>{item.purchases_count}人已购买</span>}
														</p>
													</li>
												)
											})
										}
									</ul>
								}
							</div>
						}
					</div>
				</div>
				<div className="tab_bottom">
					<_Popover>
					<div className='first' onClick={()=>{return false}}>
						<img src={serve} alt=""/><p>咨询</p>
					</div>
					</_Popover>
					<div onClick={this.handleCollect}><img src={product&&product.is_collect==true?heart1:heart} alt=""/><p>{product&&product.is_collect==true?'已收藏':'收藏'}</p></div>
					<div className='last third' onClick={this.addCart}>加入购物车</div>
					<div className='last' onClick={this.handleSubmit}>立即购买</div>
				</div>
			</div>
		);
	}
}
