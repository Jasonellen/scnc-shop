import React, {Component} from 'react';
import {SwipeAction, Toast} from 'antd-mobile'
import './index.scss';
import {Link} from 'react-router'
import ReactIScroll  from 'react-iscroll'
import Blank from '@/components/Blank'

export default class MyCollection extends Component {
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

	//删除收藏
	cancelCollect= (id)=>{
		_fetch(url.collect(id),{operation:1},'FORM')
			.then((data)=>{
				if(data){
					let newData = this.state.data.filter(function(item){
						return item.id != id
					})
					this.setState({data:newData},()=>{
						Toast.info('删除成功',1)
					})
				}else{
					Toast.fail('删除失败',1)
				}
			})
	}

	render() {
		return (
			<div className="MyCollection">
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
													<SwipeAction
														autoClose
														right={[
															{
																text: '取消',
																onPress: () => console.log('cancel'),
																style: { backgroundColor: '#ddd', color: 'white' },
															},
															{
																text: '删除',
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
												</li>
											)
										})
									}
								</ul>
							: <Blank />
						}
						</div>
					</ReactIScroll>
				</div>
			</div>
		);
	}
}
