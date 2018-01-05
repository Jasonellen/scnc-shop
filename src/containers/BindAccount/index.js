import React, {Component} from 'react';
import { InputItem, WingBlank, Button, Toast} from 'antd-mobile';
import {Link, browserHistory} from 'react-router'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as bindAccount from '@/actions/bindAccount.js';
import './index.scss'

//图片
import wechat from 'static/wechat.svg'
import _link from 'static/link.svg'
import shanger from 'static/shanger.png'

class BindAccount extends Component {

	componentDidMount(){
		this.props.changeData({disabled:true})	
	}
	handleNext=()=>{
		const mobile = this.props.state.mobile
		_fetch(url.check_mobile,{mobile:mobile})
			.then(data=>{
				if(data.success){
					browserHistory.push('/bindAccount2')
				}else{
					Toast.info(data.desc,1);
				}
			})
	}
	render() {
		const {disabled} = this.props.state
		return (
			<div className="BindAccount">
				<div className="head clearfix">
					<div className="circle pull-left">
						<img src={wechat} alt=""/>
					</div>
					<img src={_link} alt="" className='link'/>
					<div className="circle pull-right">
						<img src={shanger} alt=""/>
					</div>
				</div>
				<div className="session1">
					<InputItem
						focused
						placeholder="请输入手机号"
						type='number'
						onChange={this.props.handleTel}
						name='input'
					>手机号</InputItem>
				</div>
				<div>
					<WingBlank size="lg">
						<Button
							className={`btn ${!disabled && 'active'}`}
							disabled={disabled}
							onClick={this.handleNext}
						>下一步</Button>
					</WingBlank>
				</div>
				<Link to='/OldAccount' className='old'>我是老用户</Link>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		state:state.bindAccount
	}
};
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(bindAccount, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(BindAccount);
