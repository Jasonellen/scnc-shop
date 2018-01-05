import React, {Component} from 'react';
import { Button, List, InputItem, Picker, TextareaItem, WingBlank, Toast} from 'antd-mobile';
import './index.scss'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import { browserHistory} from 'react-router'
import * as addAddressAction from '@/actions/addAddress.js';
import cities from '@/lib/cities'

class AddAddress extends Component {
	componentDidMount(){
		if(this.props.location.state){ //从编辑进入--保持持久化数据
			this.props.edit(this.props.location.state)
		}else{
			//如果不是编辑进来则清空列表
			this.props.clearAll()
		}
	}
	//提交新增收获地址
	handleSubmit = ()=>{
		const {address_code, detail, phone, name,id} =this.props.state
		_fetch(url.addresses_add,{
			name,
			phone:phone.replace(/\s/g,''),
			address_code,
			detail,
			id:id
		},'FORM')
			.then((data)=>{
				if(data.success){
					this.props.location.state?Toast.info('地址更新成功',1):Toast.info('地址新增成功',1)
					browserHistory.goBack()
				}
			})
		;
	}
	render() {
		const { name, phone, proLabel, cityLabel, areaLabel, detail} = this.props.state
		return (
			<div className="AddAddress">
				<List>
					<InputItem
						clear
						placeholder="请输入姓名"
						value={name}
						onChange={(text)=>this.props.changeName(text)}
					>收货人</InputItem>
				</List>
				<List>
					<InputItem
						clear
						type='phone'
						value={phone}
						placeholder="请输入手机号码"
						onChange={(text)=>this.props.changeTel(text)}
          >联系电话</InputItem>
				</List>
				<List>
				<div className="select">
					{
						<Picker
							key={new Date().getTime()}
							data={cities}
							title="选择地区"
							extra={proLabel +' '+ cityLabel +' '+ areaLabel}
							onChange={(v) => this.props.changeLabelData(v)}
						>
							<List.Item arrow="horizontal">选择地区</List.Item>
						</Picker>
					}
				</div>
				</List>
				<List>
				<TextareaItem
					value={detail}
					rows={3}
					placeholder="请填写详细地址（不少于5个字）"
					onChange={(v)=>this.props.changeAddress(v)}
				/>
				</List>
				<WingBlank size="lg">
					<Button
						className={name&&phone&&cityLabel&&detail ? 'btn active' : 'btn'}
						onClick = {this.handleSubmit}
						disabled={!name || !phone || !cityLabel || !detail }
					>保存</Button>
				</WingBlank>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		state:state.addAddress
	}
};
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(addAddressAction, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
