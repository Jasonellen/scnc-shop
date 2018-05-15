import React, {Component} from 'react';
import { Modal, WhiteSpace, InputItem, WingBlank, Button} from 'antd-mobile';
const Alert = Modal.alert
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'
import * as manageAccount from '@/actions/manageAccount.js';
import './index.scss'

//图片
import see from 'static/see.svg'
import nosee from 'static/nosee.svg'

class ManageAccount extends Component {
	state={
		password:'',
		newpassword:'',
	}
	handleSubmit=()=>{
		const {newpassword, password} =this.state
		_fetch(url.change_password,{password, newpassword}, 'FORM')
			.then(data=>{
				if(data.success){
					Alert('', '密码修改成功', [
						{
							text: '确定',
							onPress: () => browserHistory.push('/'),
						},
					])
				}else{
					Alert('','原密码错误')
				}
			})
	}
	render() {
		const {see1, see2} = this.props.state
		const {newpassword, password} =this.state
		return (
			<div className="manageAccount">
			<WhiteSpace/>
				<div className='changePassword'>
					<InputItem
						placeholder="请输入原密码"
						type={see1 ? '' : 'password'}
						onChange={(password)=>this.setState({password})}
						extra={<img src={see1 ? see : nosee} alt="" onClick={()=>this.props.changeData({see1:!see1})} />}
					>原密码</InputItem>
					<WhiteSpace/>
					<InputItem
						placeholder="请输入新密码"
						type={see2 ? '' : 'password'}
						onChange={(newpassword)=>this.setState({newpassword})}
						extra={<img src={see2 ? see : nosee} alt="" onClick={()=>this.props.changeData({see2:!see2})} />}
					>新密码</InputItem>
					<div>
						<WingBlank size="lg">
							<Button
								className={`btn ${password && newpassword && 'active'}`}
								disabled={!password || !newpassword}
								onClick={this.handleSubmit }
							>提交</Button>
						</WingBlank>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		state:state.manageAccount
	}
};
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(manageAccount, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);
