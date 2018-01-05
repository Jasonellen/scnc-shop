/**
 * Created by mds on 17/10/31.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chat from '~/Chat'
import ExpertChat from '~/ExpertChat'

@connect(
	state => {
		return {
			user:state.other.user,
		}
	},
	null
)
export default class goChat extends Component {
	constructor(){
		super()
		this.state={
			Chat:''
		}
	}
	componentDidMount(){
		const { id, user_type, chat_limited} = this.props.user
		if(user_type == 0){
			_fetch(url.get_conversation, {from_id:id})
				.then(data=>{
					if(data.success == true && chat_limited == 0){
						this.setState({Chat:'Chat'})
					}else{
						this.setState({Chat:'ExpertChat'})
					}
				})
		}else{
			this.setState({Chat:'ExpertChat'})
		}
	}

	render() {
		return (
			<div style={{width:'100%',height:'100%'}}>
				{this.state.Chat == 'Chat' && <Chat />}
				{this.state.Chat == 'ExpertChat' && <ExpertChat />}
			</div>
		);
	}
}

