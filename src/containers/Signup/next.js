import React, {Component} from 'react';
import {Modal, InputItem, Button, Toast} from 'antd-mobile';
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux';
import * as otherAction from '@/actions/other';
import { bindActionCreators } from 'redux'
import './index.scss'


@connect(
	null,
	dispatch => bindActionCreators(otherAction, dispatch)
)
export default class Next extends Component {
	state={

	}
	componentDidMount() {
		
	}
	handleSubmit = ()=>{
		const { name } = this.state
		const { mobile,code,password } = this.props.location.query
		if(!name){
			Modal.alert('','昵称不能为空！')
		}else{
			_fetch(url.users_register,{ mobile,code,password,nick_name:name,user_type:1 }, 'FORM')
				.then(data=>{
					if(data.success == true){
						Toast.info('注册成功',1,()=>{
							browserHistory.push('/login')
						})
					}else{
						Modal.alert('',data.desc)
					}
				})
		}
	}
	render() {
		return (
			<div className="loginModal Forget">
				<h1>完善资料</h1>
				<InputItem 
					placeholder='请输入昵称'
					clear
					onChange={(name)=>this.setState({name})}
					maxLength={16}
				/>
				<Button type='primary' onClick={this.handleSubmit}>完成</Button>
				<div className='btm'><Link to='/login'><span className='signup'>重新登录</span></Link></div>
			</div>
		);
	}
}
