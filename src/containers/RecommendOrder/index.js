import React, {Component} from 'react';
import './index.scss';
import {Tabs} from 'antd-mobile';
import DataSelector from '@/components/DataSelector'
import UpPull from '@/components/UpPull'
import Blank from '@/components/Blank'

export default class RecommendOrder extends Component {
	constructor(props){
		super(props)
		this.state={
			dataGoing:[],
			dataFinished:[],
			page1:1,
			page2:1,
			isLoading1:false,
			isLoading2:false,
			starttime1:'',
			starttime2:'',
			endtime1:'',
			endtime2:'',
			hasMore1:true,
			hasMore2:true,
			id:props.location.query && props.location.query.id || ''
		}
	}
	componentDidMount(){
		setTimeout(()=>{
			this.scroll1 = new IScroll('.warp',{
				probeType: 2
			})
			this.setState({
				iscroll1:this.scroll1
			})
		},500)

		//获取进行中列表数据
		this.getData(1,'dataGoing')
		//获取已完成列表数据
		this.getData(0,'dataFinished')
	}
	componentDidUpdate(){
		setTimeout(()=>{
			this.scroll1&&this.scroll1.refresh()
			this.scroll2&&this.scroll2.refresh()
		},0)
	}
	componentWillUnmount(){
		this.scroll1 = null
		this.scroll2 = null
	}
	handleTabChange = (i)=>{
		if(i == 2){
			setTimeout(()=>{
				this.scroll2 = new IScroll('.warp1',{
					probeType: 2
				})
				this.setState({
					iscroll2:this.scroll2
				})
			},0)
		}
	}
	handleLoading1 = () =>{
		this.setState({isLoading1:true, page1:this.state.page1+1}, ()=>{
			const {starttime1, endtime1, page1,id} = this.state
			_fetch(url.myOrder,{order_type:1,starttime:starttime1,endtime:endtime1,page:page1,order_status:1,id})
				.then(data=>{
					if(data && data.orders.length>0){
						this.setState({dataGoing:this.state.dataGoing.concat(data.orders),isLoading1:false})
					}else{
						this.setState({hasMore1:true,isLoading1:false})
					}
				})
		})
	}
	handleLoading2 = () =>{
		this.setState({isLoading2:true, page2:this.state.page2+1}, ()=>{
			const {starttime2, endtime2, page2,id} = this.state
			_fetch(url.myOrder,{order_type:1,starttime:starttime2,endtime:endtime2,page:page2,order_status:0,id})
				.then(data=>{
					if(data){
						this.setState({dataFinished:this.state.dataFinished.concat(data.orders),isLoading2:false})
					}else{
						this.setState({hasMore2:true,isLoading2:false})
					}
				})
		})
	}
	//获取当月的数据
	handleSelect = (date)=>{
		let starttime1='';
		let endtime1='';
		if(date){
			starttime1 = date.replace('年','-').replace('月','-1')
			let endIndex = date.indexOf('月')
			let year = 	date.slice(0,4)
			let month = Number(date.slice(5,endIndex))
			endtime1 = `${year}-${Number(month)+1}-1`
		}
		this.setState({hasMore1:true,starttime1,endtime1, page1:1}, ()=>{
			this.getData(1, 'dataGoing')
		})
	}

	//获取当月的数据 --已完成
	handleSelectFinshed = (dateFinished)=>{
		let starttime2='';
		let endtime2='';
		if(dateFinished){
			starttime2 = dateFinished.replace('年','-').replace('月','-1')
			let endIndex = dateFinished.indexOf('月')
			let year = 	dateFinished.slice(0,4)
			let month = Number(dateFinished.slice(5,endIndex))
			endtime2 = `${year}-${Number(month)+1}-1`
		}
		this.setState({hasMore2:true,starttime2,endtime2,page2:1}, ()=>{
			this.getData(0, 'dataFinished')
		})
	}

	//获取数据
	getData = (order_status,obj_data)=>{
		const {starttime1, endtime1, starttime2, endtime2, page1, page2, id} = this.state
		const page = order_status == 1 ? page1 : page2
		const starttime = order_status == 1 ? starttime1 : starttime2
		const endtime = order_status == 1 ? endtime1 : endtime2
		_fetch(url.myOrder,{order_type:1,starttime,endtime,page,order_status, id})
			.then(data=>{
				if(data){
					this.setState({[obj_data]:data.orders})
				}
			})
	}
	render() {
		const {dataGoing, dataFinished, isLoading1,isLoading2, hasMore1, hasMore2, iscroll1, iscroll2} =this.state
		return (
			<div className="RecommendOrder">
				<Tabs
					defaultActiveKey='1'
					swipeable={true}
					onTabClick = {this.handleTabChange}
					>
          <Tabs.TabPane tab="进行中" key="1">
						<div className='box'>
							<div className="warp">
								<div>
								{
									dataGoing.length>0
									?
										<ul className='list'>
											{
												dataGoing.map((item, i)=>{
													return(
														<li key={i}>
															<div className="head clearfix">
																<div className="pull-left">
																	<img src={item.user.headimageurl} alt=""/>
																	<span>{item.user.name}</span>
																</div>
															</div>
															<div className="body">
																<div className='clearfix'>
																	<div className="pull-left title">订单编号：</div>
																	<div className="pull-left">{item.order_no}</div>
																</div>
																<div className='clearfix'>
																	<div className="pull-left title">订单商品：</div>
																	<div className="pull-left content">
																		<ul>
																		{
																			item.order_items.map(function(item2, index){
																				return (
																					<li className='clearfix' key={index}>
																						<div className="pull-left">{item2.name}</div>
																						<div className="pull-right">x{item2.quantity}</div>
																					</li>
																				)
																			})
																		}
																		</ul>
																	</div>
																	<div className='clearfix'>
																		<div className="pull-left title">下单时间：</div>
																		<div className="pull-left">{item.created_at && item.created_at.slice(0,10)}</div>
																	</div>
																	<div className='clearfix'>
																		<div className="pull-left title">订单状态：</div>
																		<div className="pull-left" style={{color:'red'}}>{item.aasm_state == 'pending' ? '待支付' : '已支付'}</div>
																	</div>
																</div>
															</div>
														</li>
													)
												})
											}
											<UpPull
												iscroll = { iscroll1 }
												hasMore ={hasMore1}
												isLoading = {isLoading1}
												onLoading = {this.handleLoading1}
											/>
										</ul>
									: <Blank />
								}
								</div>
							</div>
							<DataSelector text='全部订单' onDataChange={this.handleSelect}/>
						</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="已完成" key="2">
						<div className='box'>
							<div className="warp1">
								<div>
								{
									dataFinished.length>0
									?
									<ul className='list'>
										{
											dataFinished.map((item, i)=>{
												return(
													<li key={i}>
														<div className="head clearfix">
															<div className="pull-left">
																<img src={item.user.headimageurl} alt=""/>
																<span>{item.user.name}</span>
															</div>
															<div className="pull-right">
																积分<i>+{item.recommend_point}</i>
															</div>
														</div>
														<div className="body">
															<div className='clearfix'>
																<div className="pull-left title">订单编号：</div>
																<div className="pull-left">{item.order_no}</div>
															</div>
															<div className='clearfix'>
																<div className="pull-left title">订单商品：</div>
																<div className="pull-left content">
																	<ul>
																		{
																			item.order_items.map(function(item2, index){
																				return (
																					<li className='clearfix' key={index}>
																						<div className="pull-left">{item2.name}</div>
																						<div className="pull-right">x{item2.quantity}</div>
																					</li>
																				)
																			})
																		}
																	</ul>
																</div>
																<div className='clearfix'>
																	<div className="pull-left title">下单时间：</div>
																	<div className="pull-left">{item.created_at && item.created_at.slice(0,10)}</div>
																</div>
																<div className='clearfix'>
																	<div className="pull-left title">订单状态：</div>
																	<div className="pull-left" style={{color:'red'}}>{item.aasm_state == 'pending' ? '待支付' : '已支付'}</div>
																</div>
															</div>
														</div>
													</li>
												)
											})
										}
										<UpPull
											iscroll = { iscroll2 }
											hasMore ={hasMore2}
											isLoading = {isLoading2}
											onLoading = {this.handleLoading2}
										/>
									</ul>
									: <Blank />
								}
								</div>
							</div>
							<DataSelector text='全部订单' onDataChange={this.handleSelectFinshed}/>
						</div>
          </Tabs.TabPane>
        </Tabs>
			</div>
		);
	}
}
