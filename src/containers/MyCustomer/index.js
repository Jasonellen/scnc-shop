import React, {Component} from 'react';
import './index.scss';
import {Badge,SwipeAction} from 'antd-mobile';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as otherAction from '@/actions/other';
import ReactIScroll  from 'react-iscroll'
import Blank from '@/components/Blank'
import star from 'static/star.png'

@connect(
	state => {
		return {
			user:state.other.user
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch)
)
export default class MyCustomer extends Component {
	constructor(props){
		super(props)
		this.state={
			data:[],
			dataFinished:[],
		}
	}
	componentDidMount(){
		if(!this.props.user){
			setTimeout(()=>{
				this.getData() //在本页面刷新,DidMount时 user信息还没请求过来
			},300)
		}else{
			this.getData()
		}
		eventEmitter.on('correct_ok', this.getData);
	}
	componentWillUnmount(){
		//重写组件的setState方法，直接返回空
		this.setState = ()=>{
			return false;
		};
		eventEmitter.removeListener('correct_ok', this.getData);
	}

	getData = ()=>{
		let requestUrl = {
			1:url.my_customer_sales,
			3:url.my_relations,
			4:url.my_workmate,
			5:url.my_agents,
		}
		_fetch(requestUrl[this.props.user.user_type])
			.then(data =>{
				if(data){
					this.setState({data})
				}
			})
	}

	render() {
		let {data} =this.state
		return (
			<div className="MyCustomer">
				<div className="warp">
					<ReactIScroll iScroll={IScroll}>
						<div>
						{
							data.length>0
								?
								<ul className='list'>
									{
										data.map((item, i)=>{
											return(
												<li key={i}>
													<SwipeAction
														autoClose
														right={[
															{
																text: <span>&nbsp;&nbsp;&nbsp;备注名&nbsp;&nbsp;&nbsp;</span>,
																onPress:()=>this.props.renameModal({modal:true,user_id:item.id}),
																style: { backgroundColor: '#F4333C', color: 'white' },
															},
														]}
													>
														<Link to={{pathname:'/MyCustomer/Chat', state:{from_id:item.id,to_id:this.props.user.id,chat_limited:item.chat_limited}}}>
															<div className="head clearfix">
																<div className="">
																	<img src={item.headimageurl || "/static/morentouxiang.png"} alt=""/>
																	<span>{item.is_old ? item.username : (item.name || item.account)}</span>
																	{
																		!!item.user_type && (item.user_type>this.props.user.user_type) && <span className='rename'>{
																			item.user_type == 3
																			? ''
																			: item.user_type == 4
																				? '代理商'
																				: item.user_type == 5
																					? '经理'
																					: ''
																		}</span>
																	}
																	{item.unread ? <Badge text={`新消息+${item.unread}`}/> : ''}
																	{
																		!!item.user_type && (item.user_type>this.props.user.user_type) && item.user_type == 3 && <img src={star}  className='star' alt=""/>
																	}
																</div>
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
