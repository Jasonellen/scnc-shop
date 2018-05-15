import React, {Component} from 'react';
import {List, WhiteSpace} from 'antd-mobile';
import {Link, browserHistory} from 'react-router'
import './index.scss'
// import passwordImg from 'static/password.png'
//图片
import jiebang from 'static/jiebang.png'
import {connect} from 'react-redux';

@connect(
	state => {
		return {
			state:state.other
		}
	},
	null
)
class ManageAccount extends Component {
	handleExit = ()=>{
		_fetch(url.doctor_logout)
			.then(data=>{
				if(data.success){
					let old_token = localStorage.getItem('s_token_old')
					localStorage.setItem('s_token',old_token)
					browserHistory.goBack()
				}
			})
	}
	render() {
		const { login_status } = this.props.state.user
		return (
			<div className="manageAccount">
				<WhiteSpace/>
					<div className="manageAccountHome">
						
						<List className="home_list top">
							<Link to='/changeBind'>
								<List.Item
									thumb={jiebang}
									arrow='horizontal'
									>更改绑定</List.Item>
							</Link>
						</List>
						{/*
							!!login_flag && (
								<List className="home_list" style={{marginTop:20}}>
									<Link to='/changePassword'>
										<List.Item
											thumb={passwordImg}
											arrow='horizontal'
											>修改密码</List.Item>
									</Link>
								</List>
							)
						*/}
						<WhiteSpace/>
					</div>
					
					{
						login_status == 1
						?
							<div onClick={this.handleExit} className='login'>退出登录</div>
						: 
							<div onClick={()=>browserHistory.replace('/login')} className='login'>账号登录</div>
					}
					{/*<Link to='/OldAccount' className='old'>我是老用户</Link>*/}
			</div>
		);
	}
}

export default ManageAccount
