/**
 * Created by shaolong on 2017/5/24.
 */
import React, {Component} from 'react';
import {browserHistory} from 'react-router'
import { Modal,Button, Picker, List, WhiteSpace, InputItem, TextareaItem, WingBlank, Toast} from 'antd-mobile';
import './index.scss';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as drawBackAction from '@/actions/drawBack.js';

@connect(
	state => {
		return {
			state:state.drawBack,
		}
	},
	dispatch => bindActionCreators(drawBackAction, dispatch)
)
export default class Drawback extends Component {

	componentDidMount(){
		let arr=[[]]
		_fetch(url.refunds_reasons)
			.then(data=>{
				if(data){
					data.map(function(item){
						arr[0].push({label:item.name,value:item.id})
					})
				}
				this.props.changeReasons(arr)
			})

		//如果是修改订单信息进来的
		const data= this.props.location.state
		if(data.order_state == 'shipping'){
			this.props.changeOrderNo(data.order_no)
			this.props.changeItemId(data.item_id)
			this.props.changeRefundReasonId(data.refund_reason_id)
			this.props.changeMemo(data.memo)
			this.props.changeRefundValue(data.refund_value)
			this.props.changeRefundType(0)
			this.props.changeD(true)
			this.props.changeRefundType(data.refund_type)
		}
	}
	handlePrice = (value)=>{
		const data = this.props.location.state
		if(value<= data.price * data.quantity){
			this.props.changeRefundValue(value)
		}else{
			this.props.changeRefundValue(this.props.state.price)
		}
	}
	handleSubmit = ()=>{
		const {order_no, item_id, refund_reason_id, memo, refund_value, refund_type} =this.props.state
		if(!refund_value){
			Toast.info('请输入正确金额',1)
		}else{
			_fetch(url.create_refund,{
				order_no,
				item_property_id:item_id,
				refund_reason_id,
				memo,
				refund_value,
				refund_type
			},'FORM')
				.then(data=>{
					if(data.success){
						Modal.alert('','退款申请已提交',[
							{
								text: '确定',
								onPress: () => {
									browserHistory.push(`/DrawbackDetail/${data.refund_id}`)
								},
							},
						])						
					}
				})
		}
	}
	render() {
		const { dsh, refund_value, reasons, refund_reason_id, refund_reason_name, refund_type, memo } = this.props.state
		const data= this.props.location.state

		return (
			<div className="Drawback">
				{/*<div className='head clearfix'>*/}
					{/*<img src={data.img_url}  alt=""/>*/}
					{/*<span>{data.name}</span>*/}
				{/*</div>*/}
				<WhiteSpace />
				{
					dsh && (
						<div>
							<div className='leixing'>退款类型
								<span className={refund_type == '1' && 'active'} onClick={()=>this.props.changeRefundType('1')}>退货</span>
								<span className={refund_type == '0' && 'active'} onClick={()=>this.props.changeRefundType('0')}>退款</span>
							</div>
							<WhiteSpace />
						</div>
					)
				}
				<Picker
					data={reasons}
					title="选择退款原因"
					cascade={false}
					extra={refund_reason_name}
					onChange={(id)=>this.props.changeRefundReasonId(id)}
				>
					<List.Item arrow="horizontal">退款原因</List.Item>
				</Picker>
				<WhiteSpace />
				<InputItem
					placeholder="请输入"
					type='number'
					value={refund_value}
					onChange={this.handlePrice}
					>退款金额：</InputItem>
				<div className='much'>最多 ￥{data.price * data.quantity}</div>
				<TextareaItem
					value={memo}
					rows={3}
					placeholder="如有其他说明，请在此填写"
					onChange={(memo)=>{this.props.changeMemo(memo)}}
				/>
				<WingBlank size="lg">
					<Button
						className={`btn ${refund_reason_id && refund_value  && 'active'}`}
						disabled={!refund_reason_id || !refund_value}
						onClick={this.handleSubmit}
					>提交</Button>
				</WingBlank>
			</div>
		)
	}
}
