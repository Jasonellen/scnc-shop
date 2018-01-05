/**
 * Created by shaolong on 2017/5/24.
 */
import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import { Toast, Modal} from 'antd-mobile';
import * as cartAction from '@/actions/cart.js';
// import * as otherAction from '@/actions/other';
import ShopList from '@/components/ShopList';
import ReactIScroll  from 'react-iscroll'

import _delete from 'static/delete.png';
import checkout from 'static/checkout.png';
import './index.scss';

@connect(
	state => {
		return {
			state:state.cart
		}
	},
	dispatch => bindActionCreators(cartAction, dispatch)
)
export default class Cart extends Component {

	componentDidMount(){
		//设置列表数据
		this.props.setListData()
	}

	// 单独选中
	handleCheck = (check, index) => {
		let newData = this.props.state.data;
		newData.cart_items[index].checked = check
		//点击取消则一起取消全选
		if(!check){
			this.props.checkedAll({checked:false})
		}
		//判断是否全部选中
		let notcheckedall = newData.cart_items.find(function(item){
			return item.checked == false
		})
		if(!notcheckedall){
			this.props.checkedAll({checked:true})
		}
		//改变当前check数据
		this.props.changeDataAction(newData)
	}

	// 加、减操作
	handleCount = (quantity, index) => {
		let newData = this.props.state.data
		newData.cart_items[index].quantity = quantity
		this.props.changeDataAction(newData)
	}

	//删除
	Del = () => {
		//需要留下的数据
		let Data = this.props.state.data.cart_items.filter((item)=>{
			return item.checked == false
		})
		let newData = this.props.state.data.cart_items
		newData.cart_items = Data
		//要删除的数据
		let DelData = this.props.state.data.cart_items.filter((item)=>{
			return item.checked == true
		})
		if(DelData.length>0){
			let DelArr=[] //要删除的ID
			DelData.map(function(item){
				DelArr.push(item.product_property.id)
			})
			Modal.alert('','确定从购物车中删除这些商品么？',[
				{ text: '取消', onPress: () => console.log('cancel') },
				{
					text: '确定',
					onPress: () => {
						_fetch(url.clearCart,{product_property_id:JSON.stringify(DelArr)},'FORM')
							.then((data)=>{
								if(data){
									this.props.changeDataAction(newData)
									Toast.info('删除成功',1);
								}
							})
					}
				},
			])
		}else{
			Modal.alert('','请先选择对应商品')
		}

	}
	// 提交订单
	handleSubmit =()=>{
		//存储选中的订单到other
		let newData = this.props.state.data.cart_items.filter(function(item){
			return item.checked == true
		})
		let items = []
		newData.map(function(item){
			items.push({
				"product_property_id":item.product_property.id,
				"quantity":item.quantity
			})
		})

		if(newData.length>0){
			browserHistory.push(`/order/${JSON.stringify(items)}`)
		}else{
			Modal.alert('','请先选择对应商品')
		}

	}

	render() {
		const {checked, totalPrice, data, del} = this.props.state
		return (
			<div className="cart">
				{
					data && data.cart_items && data.cart_items.length > 0
						?
						<div>
							<div className="topbar">
								<div className="checkbox">
									<input type="checkbox"
										checked={checked}
										onChange={this.props.checkedAllAction}
									/>
									<span className="sel"></span>
									<div className="all">全选</div>
								</div>
								<div className="operation" onClick={this.props.changeDelAction}>
									{del ? '完成' : '编辑'}
								</div>
							</div>

							<div className="shop_list">
								<div className='warp'>
									<ReactIScroll iScroll={IScroll}>
									<div>
										{
											data.cart_items.map((item, index)=>{
												return <ShopList
													key={index}
													data={item}
													onCheck={(check)=>this.handleCheck(check, index)}
													onCount={(quantity)=>this.handleCount(quantity, index)}
												/>
											})
										}
									</div>
									</ReactIScroll>
								</div>
							</div>

							<div className="bottom-bar">
								<div className="tip">合计:&nbsp;<span>￥{totalPrice}</span></div>
								{
									del
										?
										<div  className="delete" onClick={this.Del}>
											<div>
										删除<img src={_delete} alt=""/>
											</div>
										</div>
										:
										<div className="delete" onClick={this.handleSubmit}>
									去结算<img src={checkout} alt=""/>
										</div>
								}
							</div>
						</div>
						:
						<div className="empty">
							<div className="cart-icon"></div>
							<h2 className="empty-notice">购物车暂无商品</h2>
							<div className="go-to-check" onClick={this.props.toHome}>继续逛逛</div>
						</div>
				}
			</div>
		)
	}
}
