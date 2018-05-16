import React, {Component} from 'react';
import { List, Modal} from 'antd-mobile'
import './index.scss';
import { Link, browserHistory } from 'react-router'
import ReactIScroll  from 'react-iscroll'
import {connect} from 'react-redux';
import Address from '@/components/Address'

@connect(
	state => {
		return {
			state: state.other.user,
		}
	},
	null
)
export default class MallDetail extends Component {
	state={
		data:'',
		detail_data:{}
	}
	componentDidMount(){
		this.getAddress()
		this.getDetailData()
	}
	getDetailData = ()=>{
		_fetch(url.exchange_goods_detail,{id:this.props.params.id})
			.then(data=>{
				this.setState({
					detail_data:data
				})
			})
	}
	getAddress = ()=>{
		_fetch(url.addresses)
			.then(data=>{
				let _data;
				if(data.addresses.length>0){
					_data = data.addresses.find(function(item){
						return item.status == 1
					})
					this.setState({data:_data})
				}
			})
	}
	handleSubmit = ()=>{
		const { data, detail_data } = this.state
		if(!data){
			Modal.alert('','添加收货地址后才能添加该商品哦~！', [
				{ text: '取消', onPress: () => console.log('cancel') },
				{
					text: '现在填写',
					onPress: () => {
						browserHistory.push('/addAddress')
					},
				},
			],'ios')
		}else{
			Modal.alert('',`确定使用${detail_data.points}积分兑换？`, [
				{ text: '取消', onPress: () => console.log('cancel') },
				{
					text: '确定',
					onPress: () => {
						_fetch(url.users_exchange_point,{
							good_id:this.props.params.id,
							address_id:data.id
						},'FORM')
							.then(data=>{
								if(data.success){
									browserHistory.push(`/duihuanpage/${this.props.params.id}/${data.exchange_id}`)
								}
							})
						
					},
				},
			],'ios')
		}
	}

	render() {
		const { data, detail_data } = this.state
		const { point } = this.props.state
		const { record } = this.props.params
		return (
			<div className="MallDetail">
				<div className="wrap">
					<ReactIScroll iScroll={IScroll}>
						<div>
							<div className="banner">
								<img src={detail_data.detail_pic} alt=""/>
							</div>
							<div className="goods">
								<h1>{detail_data.good_name}</h1>
								<div className='p clearfix'>
									<div className="pull-left">{detail_data.points}<span>积分</span><i>&yen;{	parseInt(detail_data.points * 1.2)}</i></div>
									<div className="pull-right">运费：包邮</div>
								</div>
							</div>
							{
								data
								?
									record
									?
										<Address
											data={data}
										/>
									:
										<Address
											arrow="horizontal"
											data={data}
											click={()=>browserHistory.push('/ManageAddressCanBack')}
										/>
								:
									<Link onClick={()=>browserHistory.push('/addAddress')}>
										<List.Item arrow="horizontal"><span className='no_address'>您还未填写收货地址，马上填写</span></List.Item>
									</Link>
							}
							<div className="constr">
								<div className="top">详情说明</div>
								<ul className="content">
									<li>
										<div>商品简介：</div>
										<p>{detail_data.goods_detail}</p>
									</li>
									<li>
										<div>兑换流程：</div>
										<p>{detail_data.exchange_process}</p>
									</li>
									<li>
										<div>注意事项：</div>
										<p>{detail_data.exchange_comment}</p>
									</li>
								</ul>
								{ record && <div className="code">订单编号：{record}</div> }
							</div>
						</div>
					</ReactIScroll>
					<div className="footer">
					{
						record
						?
							<div onClick={this.handleSubmit}>返回积分商城</div>
						: 
							<div>
								{
									point >= detail_data.points
									?
										<div onClick={()=>browserHistory.push('/IntegralMall')}>立即兑换</div>
									:
										<div style={{background:'grey'}}>积分不足</div>
								}
							</div>
					}
					</div>
				</div>
			</div>
		);
	}
}
