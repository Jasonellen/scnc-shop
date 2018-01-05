/**
 * Created by shaolong on 2017/5/24.
 */
import React, {Component} from 'react';
import {browserHistory} from 'react-router'
import { WhiteSpace, Picker, List, InputItem, WingBlank, Button, Modal} from 'antd-mobile';
import './index.scss';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as applyBackLogistics from '@/actions/applyBackLogistics.js';


@connect(
	state => {
		return {
			state:state.applyBackLogistics,
		}
	},
	dispatch => bindActionCreators(applyBackLogistics, dispatch)
)
export default class ApplyBackLogisticsEdit extends Component {

	componentDidMount(){
		//获取快递方式
		_fetch(url.shippings)
			.then((data)=>{
				this.props.initialShippings(data)
			})
		this.props.hasLogistic(false)

	}

	handleSubmit = ()=>{
		const {ship_no, shipping_id} = this.props.state
		const refund_id = this.props.location.state		
		_fetch(url.refund_shipment,{
			ship_type:1,
			refund_id,
			shipping_id,
			shipping_no:ship_no
		},'FORM')
			.then(data=>{
				if(data.res_code == 0){
					this.props.hasLogistic(true)
					this.props.changeTraces(data.traces)
					this.props.changeStatus(data.status)
					browserHistory.push('/ApplyBackLogistics')
				}else{
					Modal.alert('',data.res_error)
				}
			})
	}

	render() {
		const {sendWayData, name, ship_no} = this.props.state
		return (
			<div className="ApplyBackLogistics">
				<WhiteSpace/>
				<Picker
					data={sendWayData}
					title="选择快递类型"
					cascade={false}
					extra={name}
					onChange={(data)=>this.props.sendSelect(data[0])}
				>
					<List.Item arrow="horizontal">快递类型</List.Item>
				</Picker>
				<WhiteSpace />
				<InputItem
					placeholder='请输入'
					value={ship_no}
					onChange={(text)=>this.props.changeNo(text)}
				>快递单号</InputItem>
				<WingBlank size="lg">
					<Button
						className={`btn ${ship_no && (name!=='请选择')  && 'active'}`}
						disabled={!ship_no || (name=='请选择')}
						onClick={this.handleSubmit}
					>提交</Button>
				</WingBlank>
			</div>
		)
	}
}
