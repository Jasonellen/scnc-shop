import React,{ Component } from 'react'
import { Modal, Toast, InputItem } from 'antd-mobile';
import './index.scss'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as otherAction from '@/actions/other';

@connect(
	state => {
		return {
			state: state.other,
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch)
)
export default class NickModal extends Component{
	constructor(props){
		super(props)
		this.state={
			show_err:false,
			show_err_length:false,
			value:'',
			OS:'',
		}
	}
	componentDidMount() {
		//判断IOS 系统版本
		var OS = window.navigator.userAgent.match(/\d+_\d[_\d]?/g);
		if(OS){
			this.setState({OS:OS[0].split('_')[0]})
		}
	}
	handleNickName = ()=>{
		const { value, show_err, show_err_length} = this.state
		const { rename_user_id } = this.props.state
		let Option = rename_user_id ? {name:value,user_id:rename_user_id} : {name:value}
		let _url = rename_user_id ? url.save_memo_name : url.update_user_name
		new Promise((resolve) => {
			if(!show_err && !show_err_length && value && value.trim()){
				_fetch(_url,Option,'FORM')
					.then(data=>{
						if(data.success){
							_fetch(url.userInfo)
								.then(data =>{
									this.props.changeUser(data)
								})
							this.props.renameModal({modal:false})
							if(rename_user_id){
								eventEmitter.emit('correct_ok'); 
							}
							Toast.info('修改成功！', 1);
							resolve();
						}else{
							Toast.info('网络出错！', 1);
						}
					})
			}
		})
	}
	handleIpt = (_value)=>{
		this.setState({value:_value},()=>{
			const { value } = this.state
			const length = value.replace(/[^\x00-\xff]/g,"aa").length
			if(!value){
				this.setState({show_err:true})
			}else{
				this.setState({show_err:false})
			}

			if(length>16){
				this.setState({show_err_length:true})
			}else{
				this.setState({show_err_length:false})
			}
		})
	}

	render(){
		const { show_err, show_err_length, OS, value } = this.state
		const { rename_modal } = this.props.state
		if(rename_modal){
			setTimeout(()=>{
				var ipt = this.P && this.P.getElementsByTagName('input')[0]
				if(ipt)ipt.focus();
			},300)
		}
		return(
			<Modal
				style={ OS && {marginTop:'-4rem',height:400}}
        title="修改昵称"
        transparent
        maskClosable={false}
        visible={rename_modal}
        onClose={()=>this.props.renameModal({modal:false})}
				footer={[
					{ text: '取消', onPress:()=>{this.props.renameModal({modal:false});this.setState({show_err:false,show_err_length:false,value:''})} },
					{ text: '确认修改', onPress:this.handleNickName } 
				]}
        platform="ios"
      >
        <div className='alert_modal' ref = {x=>this.P = x}>
					{ show_err_length && <span>8个字以内</span> }
					<InputItem
            clear
            placeholder="请输入昵称"
            value={value}
            onChange={this.handleIpt}
          ></InputItem>					
					{ show_err && <p>昵称不能为空</p> }
        </div>
      </Modal>
		)
	}
}
