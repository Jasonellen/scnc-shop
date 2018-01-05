import React, {Component} from 'react';
import { Modal, Flex, Checkbox, List, WhiteSpace} from 'antd-mobile';
import './index.scss'
const Alert = Modal.alert
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import { Link} from 'react-router'
import * as manageAddress from '@/actions/manageAddress.js';
import * as orderAction from '@/actions/order.js';
import ReactIScroll  from 'react-iscroll'
//图片
import bianji from 'static/bianji.svg'
import del from 'static/del.svg'
import add from 'static/add.svg'

@connect(
	state => {
		return {
			state:state.manageAddress,
			canBack:state.order.canBack
		}
	},
	dispatch => {
		return {
			manageAddressAction:bindActionCreators(manageAddress, dispatch),
			orderAction:bindActionCreators(orderAction, dispatch)
		}
	}
)
export default class ManageAddress extends Component {
	componentDidMount(){
		//获取地址信息
		_fetch(url.addresses)
			.then((data)=>{
				this.props.manageAddressAction.setAddress(data.addresses)
			})
	}

	//设置默认地址
	handleDefault=(id)=>{
		_fetch(url.addresses_default(id),{},'FORM')
			.then(data=>{
				if(data.success){
					this.props.manageAddressAction.setDefault(id)
				}
			})
	}
	//删除收获地址
	handleDel = (status, id)=>{
		if(status == '1'){
			Alert('', '默认地址不能删除')
		}else{
			Alert('', '是否确定删除该地址?', [
				{ text: '取消', onPress: () => console.log('cancel') },
				{
					text: '确定删除',
					onPress: () => {
						_fetch(url.addresses_del(id),{},'FORM')
							.then(data=>{
								if(data.success){
									this.props.manageAddressAction.delAddress(id)
								}
							})
					},
				},
			])
		}
	}

	render() {
		const {addressData} =this.props.state
		return (
			<div className="manageAddress">
				<div className="warp">
					<ReactIScroll iScroll={IScroll}>
					<ul>
						{
							addressData && addressData.length>0 && addressData.map((item, i)=>{
								return(
									<li key={i}>
										<List className="address" >
											<List.Item
												// arrow="horizontal"
												multipleLine
											>
												<div>
													<div className='clearfix haveAddress'>
														<div className="pull-left">收货人：{item.name}</div>
														<div className="pull-right">{item.phone}</div>
													</div>
													<List.Item.Brief>收货地址：{item.full_address}</List.Item.Brief>
												</div>
											</List.Item>
										</List>
										<Flex>
											<Checkbox
												checked={item.status == '1'}
												onChange={()=>this.handleDefault(item.id)}
												>&nbsp;&nbsp;<span className={item.status=='1'&&'default'}>默认地址</span>
											</Checkbox>
											<Flex>
												<Link  to={{pathname:'/AddAddress', state:item}} className='tag'>
													<img src={bianji} alt=""/><span>编辑</span>
												</Link>
												<div className='tag' onClick={()=>this.handleDel(item.status,item.id)}>
													<img src={del} alt=""/>删除
												</div>
											</Flex>
										</Flex>
										<WhiteSpace />
									</li>
								)
							})
						}
					</ul>
					</ReactIScroll>
				</div>
				<Link to='/addAddress' className="addAddress">
					<img src={add} alt=""/>
					<span>新增地址</span>
				</Link>
			</div>
		);
	}
}
