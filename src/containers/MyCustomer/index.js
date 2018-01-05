import React, {Component} from 'react';
import './index.scss';
import {Tabs,Badge} from 'antd-mobile';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import ReactIScroll  from 'react-iscroll'
import Blank from '@/components/Blank'

@connect(
	state => {
		return {
			user:state.other.user
		}
	}
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
	}

	getData = ()=>{
		if(this.props.user.user_type == 1){
			//获取我的消费者列表
			_fetch(url.my_customer)
				.then(data =>{
					if(data){
						this.setState({data})
					}
				})
		}else if(this.props.user.user_type == 3){
			//获取医生客户
			_fetch(url.my_doctor_relations)
				.then(data =>{
					if(data){
						this.setState({data})
					}
				})
		}
	}

	render() {
		let {data} =this.state
		return (
			<div className="MyCustomer">
				<Tabs
					defaultActiveKey='1'
					swipeable={false}
					onTabClick = {this.handleTabChange}
				>
					<Tabs.TabPane tab={`扫码注册用户(${data.length})`} key="1">
						<div className="warp">
							<ReactIScroll iScroll={IScroll}>
								<div>
								{
									data.length>0
										?
										<ul className='list'>
											{
												data.map((item, i)=>{
													if(this.props.user.user_type == 1 ){
														return(
															<li key={i}>
																<Link to={{pathname:'/MyCustomer/Chat', state:{from_id:item.id,headimageurl:item.headimageurl,chat_limited:item.chat_limited}}}>
																	<div className="head clearfix">
																		<div className="">
																			<img src={item.headimageurl || "/static/morentouxiang.png"} alt=""/>
																			<span>{item.is_old ? item.username : item.name}</span>
																			{item.unread ? <Badge text={`新消息+${item.unread}`}/> : ''}
																		</div>
																	</div>
																</Link>
															</li>
														)
													}
													if(this.props.user.user_type == 3 ){
														return(
															<li key={i}>
																<Link to={{pathname:'/RecommendOrder',query:{id:item.id}}}>
																	<div className="head clearfix">
																		<div className="">
																			<img src={item.headimageurl || "/static/morentouxiang.png"} alt=""/>
																			<span>{item.is_old ? item.username : item.name}</span>
																		</div>
																	</div>
																</Link>
															</li>
														)
													}
												})
											}
										</ul>
										: <Blank />
								}
								</div>
							</ReactIScroll>
						</div>
					</Tabs.TabPane>
					{/*<Tabs.TabPane
						tab={`推荐注册用户(${dataFinished.length})`}
						key="2"
					>
						<div className="warp">
							<ReactIScroll iScroll={IScroll}>
								<div>
								{
									dataFinished.length>0
										?
										<ul className='list'>
											{
												dataFinished.map((item, i)=>{
													return(
														<li key={i}>
															<Link to={{pathname:'/MyCustomer/Chat', state:item.id + '南' + item.headimageurl}}>
																<div className="head clearfix">
																	<div className="pull-left">
																		<img src={item.headimageurl || "/static/morentouxiang.png"} alt=""/>
																		<span>{item.name}</span>
																	</div>
																</div>
															</Link>
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
					</Tabs.TabPane>*/}
				</Tabs>
			</div>
		);
	}
}
