import React, {Component} from 'react';
import './index.scss';
import {ImagePicker,Toast, ActivityIndicator} from 'antd-mobile';
// import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as otherAction from '@/actions/other';
import ReactIScroll  from 'react-iscroll'
//图片
import chatAdd from 'static/chatAdd.svg'
import chatPic from 'static/chatPic.svg'
import iptimg from 'static/ipt.jpg'

@connect(
	state => {
		return {
			user:state.other.user,
			expertChatInfo:state.other.expertChatInfo
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch)
)
export default class ExpertChat extends Component {
	constructor(props){
		super(props)
		this.socket = {}
		this.state = {
			picShow: false,
			text:'',
			files: [],
			totalMsg:[],
			page:1,
			loadingShow:false,
			src:'1',
			isOpen:false,
			OS:'',
		}
	}
	componentDidMount(){
		//判断IOS 系统版本
		var OS = window.navigator.userAgent.match(/\d+_\d[_\d]?/g);
		if(OS){
			this.setState({OS:OS[0].split('_')[0]})
		}
		setTimeout(()=>{
			let _this = this
			this.scroll = new IScroll('.warp',{probeType: 2})
			setTimeout(()=>{
				this.scroll.scrollToElement(this.refs.scrollLine,300,null,null,{
					style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
					fn: function (k) {
						return k * ( 2 - k );
					}
				})
			},0)
			this.scroll.on('scroll', function(){
				if(this.y>0){
					_this.setState({loadingShow:true},()=>{
						clearTimeout(_this.timer)
						_this.timer = setTimeout(()=>{
							_this.setState({page:_this.state.page+1},()=>{
								_this.getMessage(_this.state.page)
							})
						},1000)
					})
				}
			});
		},500)
		
		//获取聊天室
		const from_id = this.props.user.id
		_fetch(url.get_expert_conversation, {from_id})
			.then(data=>{
				if(data.success){
					this.props.changeExpertChatInfo(data)
					console.log('后台聊天室:',data)
					this.setState({
						conversation_id:data.conversation_id,
						to_id:data.to_id
					},()=>{
						this.startSocket()
						this.getMessage(1)
					})
				}
			})
	}

	//开始socket流程
	startSocket = ()=>{
		const {to_id,conversation_id } = this.state
		console.log('聊天室id:',conversation_id)
		// socket发送消息
		this.socket.sendmessage = (content, msg_type)=>{  //0文本  1 图片
			let data = {
				message : {from_id:this.props.user.id,to_id,conversation_id,msg_type, content},
				action : "speak"
			};
			let message = {
				command: "message",
				identifier: JSON.stringify(this.socket.param),
				data: JSON.stringify(data)
			};
			this.socket.ws.send(JSON.stringify(message));
		}

		//socket建立连接 并监听消息
		this.socket.connect_server = ()=>{
			// const WebSocket = require('ws');  package安装后就可以使用了，不可以再引用，不然报错...不安装接收不到广播消息..
			this.socket.ws = new WebSocket('wss://m.scnc-sh.com/cable', ["actioncable-v1-json", "actioncable-unsupported"]);
			this.socket.param = {channel: "ChatChannel", conversation_id: conversation_id};
			this.socket.ws.onopen =()=>{
				let data = {
					command: "subscribe",
					identifier: JSON.stringify(this.socket.param)
				}
				this.socket.ws.send(JSON.stringify(data));
			};
			this.socket.ws.onmessage = (event)=>{
				if(JSON.parse(event.data).type != 'ping' && JSON.parse(event.data).message){
					const arr = JSON.parse(JSON.parse(event.data).message.message)
					const totalMsg = this.state.totalMsg.concat(arr)
					this.setState({totalMsg},()=>{
						setTimeout(()=>{
							this.scroll && this.scroll.scrollToElement(this.refs.scrollLine)
						},0)
					})
					console.log(event,totalMsg)
				}
			};
		}

		this.socket.connect_server();
	}
	//获取历史消息
	getMessage = (page)=>{
		const {conversation_id} = this.state
		_fetch(url.get_message,{
			conversation_id,
			page
		})
			.then(data=>{
				this.setState({loadingShow:false})
				if(data.length>0){
					this.setState({totalMsg:data.concat(this.state.totalMsg)})
				}else{
					this.state.totalMsg.length>0 && Toast.info('没有更多数据了',1)
				}
			})
	}
	//展开面板
	handlePan=(value)=>{
		this.setState({picShow:value},()=>{
			document.getElementById('ExpertChat').scrollTop = document.getElementById('ExpertChat').scrollHeight;
		})
	}
	//输入文本
	textChange=(e)=>{
		this.setState({text:e.target.value},()=>{
			this.refs.textarea.style.height = '';
			this.refs.textarea.style.height = this.refs.textarea.scrollHeight + 'px';
		})
	}
	//选择本地图片
	imgChange = (files) => {
		// console.log(files, type, index);
		files.map((item)=>{
			this.socket.sendmessage(item.url, 1)
		})
		this.setState({picShow:false})
	}
	//点击发送按钮
	sendMsg = ()=>{
		const {text} = this.state
		if(text.trim()){
			this.socket.sendmessage(text, 0)
			this.setState({text:''},()=>{
				this.refs.textarea.style.height = '';
			})
		}
	}
	//聚焦
	handleFocus = ()=>{
		setTimeout(()=>{
			if(this.state.OS && this.state.OS < 11){
				this.refs.ipt.scrollIntoView(true);
				this.refs.ipt.scrollIntoViewIfNeeded();
			}else if(this.state.OS){
				return;
			} else {
				this.refs.ipt.scrollIntoView(true);
				document.body.scrollTop = document.body.scrollHeight;
			}
		},400)
	}
	componentDidUpdate() {
		setTimeout(()=>{
			this.scroll && this.scroll.refresh()
		},0)
	}
	imgView = (src)=>{
		this.setState({
			isOpen:true,
			src
		})
	}
	handleClose = ()=>{
		this.setState({isOpen:false})
	}
	componentWillUnmount(){
		this.scroll = null
		this.socket.ws.close()
		this.socket = null;
	}
	render() {
		const {picShow, text, totalMsg,isOpen, src,loadingShow} = this.state
		const  selfHeadImg= this.props.user.headimageurl
		return (
			<div id="ExpertChat">
				<div className="box" onClick={()=>this.handlePan(false)}>
					<div className={`imgView ${isOpen && 'active'}`}>
						<ReactIScroll iScroll={IScroll}>
							<img src={src} alt="" onClick={this.handleClose}/>
						</ReactIScroll>
					</div>
					<div className="warp">
						<ul>
							{loadingShow && <ActivityIndicator />}
							{
								totalMsg.length>0 && totalMsg.map((item, i)=>{
									if(item.from_id == this.props.user.id){
										if(item.msg_type == 0){
											return (
												<li className='right_text  clearfix' key={i}>
													<div className="head pull-right">
														<img src={selfHeadImg} alt=""/>
													</div>
													<div className="text pull-right">
														<span>{item.content}</span>
													</div>
												</li>
											)
										}else{
											return (
												<li className='right clearfix' key={i}>
													<div className="head pull-right">
														<img src={selfHeadImg} alt=""/>
													</div>
													<div className="text pull-right">
														<img src={item.content} alt="" onClick={()=>this.imgView(item.content)}/>
													</div>
												</li>
											)
										}
									}else{
										if(item.msg_type == 0){
											return (
												<li className='left clearfix' key={i}>
													<div className="head pull-left">
														<img src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=983249201,1830044883&fm=27&gp=0.jpg' alt=""/>
													</div>
													<div className="text pull-left">
														<span>{item.content}</span>
													</div>
												</li>
											)
										}else{
											return (
												<li className='left clearfix' key={i}>
													<div className="head pull-left">
														<img src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=983249201,1830044883&fm=27&gp=0.jpg' alt=""/>
													</div>
													<div className="text pull-left">
														<img src={item.content} alt="" onClick={()=>this.imgView(item.content)}/>
													</div>
												</li>
											)
										}
									}
								})
							}
						</ul>
						<div className="scrollLine" ref='scrollLine'></div>
					</div>
				</div>
				<div className="bottom">
					<div className="head" ref = 'ipt'>
						<textarea  value={text} onChange={(e)=>this.textChange(e)} ref='textarea' onClick={this.handleFocus} onFocus={this.handleFocus} />
						<span onClick={this.sendMsg}>发送</span>
						<img src={chatAdd} alt="" onClick={()=>this.handlePan(true)}/>
					</div>
					<div className={picShow ? "body active" : 'body none'}>
						<ImagePicker
							onChange={this.imgChange}
						/>
						<ul className='clearfix'>
							<li className='pull-left'>
								<div>
									<img src={chatPic} alt=""/>
								</div>
								<span>照片</span>
							</li>
						</ul>
					</div>
					<img src={iptimg} alt="" className='iptimg'/>
				</div>
			</div>
		);
	}
}
