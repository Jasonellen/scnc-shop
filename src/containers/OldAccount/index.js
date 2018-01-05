import React, {Component} from 'react';
import { Modal, InputItem, WingBlank, Button, Toast} from 'antd-mobile';
import {browserHistory} from 'react-router'
import './index.scss'

export default class OldAccount extends Component {
	constructor(){
		super()
		this.state={
			username:'',
			password:''
		}
	}

	handleAccount = (username)=>{
		this.setState({username})
	}
	handlePassword = (password)=>{
		this.setState({password})
	}
	handleSubmit = ()=>{
		_fetch(url.login,this.state, 'FORM')
			.then(data=>{
				if(data.success == true){
					Toast.info('匹配成功，数据已导入',1)
					browserHistory.push('/')
				}else{
					Modal.alert('',data.desc)
				}
			})
	}

	render() {
		const {username,password} = this.state
		return (
			<div className="OldAccount">
				<div className="head clearfix">
					如果您是老用户，要先登录以前的账号和密码，才能获取以前的数据和记录
				</div>
				<div className="session1">
					<InputItem
						placeholder="请输入账号"
						autoFocus
						onChange={this.handleAccount}
					>账号</InputItem>
					<InputItem
						placeholder="请输入密码"
						type='password'
						onChange={this.handlePassword}
					>密码</InputItem>
				</div>
				<div>
					<WingBlank size="lg">
						<Button
							className={`btn ${username && password && 'active'}`}
							disabled={!username || !password}
							onClick={this.handleSubmit}
						>提交</Button>
					</WingBlank>
				</div>

			</div>
		);
	}
}

