import React, {Component} from 'react';
import {SwipeAction, Toast} from 'antd-mobile'
import './index.scss';
import {Link} from 'react-router'
import ReactIScroll  from 'react-iscroll'
import Blank from '@/components/Blank'

export default class ExchangeRecord extends Component {
	constructor(props){
		super(props)
		this.state = {
			data:[]
		}
	}
	componentDidMount(){
		//获取列表数据
		_fetch(url.collections)
			.then(data=>{
				this.setState({data})
			})
	}

	render() {
		return (
			<div className="ExchangeRecord">
				<div className="warp">
					<ReactIScroll iScroll={IScroll}>
						<div>
						{
							this.state.data.length>0
							?
								<ul>
									{
										this.state.data.map((item,i)=>{
											return(
												<li key={i}>
													<Link to={`/GoodsDetail/${item.id}`}>
														<div className='clearfix left'>
															<span className='pull-left _left'>
																<img src={item.image_url} alt="" className='pull-left'/>
																<div className="pull-right clearfix">
																		<p>{item.name}</p>
																		<span>成功</span>
																</div>
															</span>
														</div>
													</Link>
												{/*
													<SwipeAction
														autoClose
														right={[
															{
																text: <span>&nbsp;&nbsp;&nbsp;删除&nbsp;&nbsp;&nbsp;</span>,
																onPress:()=>this.cancelCollect(item.id),
																style: { backgroundColor: '#F4333C', color: 'white' },
															},
														]}
														onOpen={() => console.log('open')}
														onClose={() => console.log('close')}
													>
														<Link to={`/GoodsDetail/${item.id}`}>
															<div className='clearfix left'>
																<span className='pull-left'>
																	<img src={item.image_url} alt="" className='pull-left'/>
																	<div className="pull-right clearfix">
																			<p>{item.name}</p>
																			<span>{item.is_new ? '价格待定' : '￥'+item.price}</span>
																	</div>
																</span>
															</div>
														</Link>
													</SwipeAction>
													*/}
												</li>
											)
										})
									}
								</ul>
							: <Blank text='还没有兑换记录哦~'/>
						}
						</div>
					</ReactIScroll>
				</div>
			</div>
		);
	}
}
