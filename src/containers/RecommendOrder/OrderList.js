import React, {Component} from 'react';
import './index.scss';
import { Toast } from 'antd-mobile';
import DataSelector from '@/components/DataSelector'
import PersonSelector from '@/components/PersonSelector'
import Blank from '@/components/Blank'
import ReactIScroll  from 'react-iscroll'
import {connect} from 'react-redux';

class OrderList extends Component {
	constructor(props){
		super(props)
		this.state={
			data:[],
			page:1,
			starttime:'',
			endtime:'',
			personData:[],
			id:'-1',
			order_status:props.order_status
		}
	}

	componentDidMount(){
		//获取列表数据
		this.getData()
		this.getPersonData()
	}
	
	handleLoading = (iscroll) =>{
		if(!iscroll.maxScrollY) return;
		if(!this.fetching && (iscroll.y <= iscroll.maxScrollY )){
			if(this.noMore){
				Toast.info('没有更多数据了！',1);
				return
			}
			this.fetching = true
			this.setState({page:this.state.page+1}, ()=>{
				const {starttime, endtime, page,id,order_status} = this.state
				_fetch(url.myOrder,{order_type:1,starttime,endtime,page,order_status,id})
					.then(data=>{
						if(data.orders.length>0){
							this.fetching = false
							this.setState({data:this.state.data.concat(data.orders)})
						}else{
							this.fetching = false
							this.noMore = true
							Toast.info('没有更多数据了！',1)
						}
					})
			})
		}		
	}

	//人物选择
	handlePersonSelect = (id)=>{
		this.setState({id,page:1},()=>{
			this.getData()
		})
	}
	//获取相关人物
	getPersonData = ()=>{
		_fetch(url.get_my_relations)
			.then(data=>{
				this.setState({personData:data})
			})
	}
	//获取当月的数据
	handleSelect = (date)=>{
		let starttime='';
		let endtime='';
		if(date){
			starttime = date.replace('年','-').replace('月','-1')
			let endIndex = date.indexOf('月')
			let year = 	date.slice(0,4)
			let month = Number(date.slice(5,endIndex))
			endtime = `${year}-${Number(month)+1}-1`
		}
		this.setState({starttime,endtime, page:1}, ()=>{
			this.getData()
		})
	}

	//获取数据
	getData = ()=>{
		const {starttime, endtime, page, id, order_status} = this.state
		_fetch(url.myOrder,{order_type:1,starttime,endtime,page,order_status,id})
			.then(data=>{
				if(data){
					this.setState({data:data.orders})
				}
			})
	}

	render() {
		const { data, personData } =this.state
		const { user_type } = this.props.user
		let colsObj = {
			3:{
				cols:1,
				title:'选择营养师',
				his:'所属营养师',
				hisType:'doctor'
			},
			4:{
				cols:2,
				title:'选择业务代表-营养师',
				his:'所属业务代表',
				hisType:'sale'
			},
			5:{
				cols:3,
				title:'选择人物关系',
				his:'所属代理商',
				hisType:'agent'
			}
		}
		let cols = 1
		let title = '选择营养师'
		let his = '所属营养师'
		let hisType = 'doctor'
		if(personData.length>0){
			cols = colsObj[user_type].cols
			title = colsObj[user_type].title
			his = colsObj[user_type].his
			hisType = colsObj[user_type].hisType
		}
		return (
			<div className='box'>
				<div className="warp">
					<ReactIScroll 
						iScroll={IScroll} 
						options={{probeType: 3}}
						onScroll = {this.handleLoading}
					>
					<div>
					{
						data.length>0
						?
							<ul className='list'>
								{
									data.map((item, i)=>{
										return(
											<li key={i}>
												<div className="head clearfix">
													<div className="pull-left">
														<img src={item.user.headimageurl} alt=""/>
														<span>{item.user.name}</span>
													</div>
													<small className="pull-right">{his}：<i>{item[hisType]}</i></small>
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
																			<div className="pull-left">{item2.name} (<small>{item2.property_name}</small>)</div>
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
														{
															item.recommend_point && (
																<div className='clearfix'>
																	<div className="pull-left title">推荐积分：</div>
																	<div className="pull-left">{item.recommend_point}</div>
																</div>
															)
														}
														{
															item.shipping_no && (
																<div className='clearfix'>
																	<div className="pull-left title">物流单号：</div>
																	<div className="pull-left">{item.shipping_no}</div>
																</div>
															)
														}
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
							</ul>
						: <Blank />
					}
					</div>
					</ReactIScroll>
				</div>
				{
					user_type == 1 
					?
					<DataSelector text='全部日期' onDataChange={this.handleSelect}/>
					:
					<div className='selectBox'>
						<PersonSelector
							title = {title}
							cols={cols}
							data = {personData}
							onChange={this.handlePersonSelect}
						/>
						<DataSelector text='全部日期' onDataChange={this.handleSelect}/>
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user:state.other.user
	}
};
export default connect(mapStateToProps, null)(OrderList);

