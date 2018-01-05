import React, {Component} from 'react';
import './index.scss';
import {Modal, ImagePicker,Switch, Toast, ActivityIndicator} from 'antd-mobile';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as otherAction from '@/actions/other';
import moment from 'moment';
global.moment = moment
import ReactIScroll  from 'react-iscroll'

//图片
import chatAdd from 'static/chatAdd.svg'
import chatQRCode from 'static/chatQRCode.svg'
import chatPic from 'static/chatPic.svg'
import serve1 from 'static/Integral.png'
import del from 'static/delete.svg'
import iptimg from 'static/ipt.jpg'


@connect(
	state => {
		return {
			user:state.other.user,
			chatInfo:state.other.chatInfo,
			QRCode:state.other.QRCode
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch)
)
export default class Chat extends Component {
	constructor(props){
		super(props)
		this.socket = {}
		this.timer=null
		this.state = {
			picShow: false,
			text:'',
			files: [],
			totalMsg:[],
			LinkIn:(props.location && props.location.state) || {},
			switchChecked:props.location && props.location.state && props.location.state.chat_limited ? false : true,
			modal:false,
			products:[],
			page:1,
			loadingShow:false,
			src:'',
			isOpen:false,
			OS:1,
		}
	}
	componentDidMount(){
		console.log(this.props.user,'===========')
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

		//获取商品列表
		_fetch(url.home)
			.then(data=> {
				this.setState({
					products: data.products,
				})
			})

		const {LinkIn} = this.state
		//获取聊天室
		const from_id = LinkIn.from_id || this.props.user.id  //获取聊天室的 from_id 和 发送消息的不一样
		console.log('当前用户id:',this.props.user.id)
		console.log('获取聊天室使用的from_id:',from_id)
		//获取聊天室信息
		_fetch(url.get_conversation, {from_id})
			.then(data=>{
				if(data.success){
					this.props.changeChatInfo(data)
					this.setState({
						conversation_id:data.conversation_id,
						to_id:LinkIn.from_id || data.to_id
					},()=>{
						this.startSocket()
						//获取历史记录
						this.getMessage(1)
					})
				}else{
					Modal.alert('',data.desc)
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
					console.log(event)
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
		this.setState({picShow:value})
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
			if(this.state.OS < 11){
				this.refs.ipt.scrollIntoView(true)
				this.refs.ipt.scrollIntoViewIfNeeded();
				document.body.scrollTop = 10000
			}
		},400)
	}
	handleChecked = ()=>{
		this.setState({switchChecked:!this.state.switchChecked},()=>{
			if(!this.state.switchChecked){
				this.setLimited(1,'用户咨询已关闭')
			}else{
				this.setLimited(0,'用户咨询已开启')
			}
		})

	}
	//设置用户权限
	setLimited = (chat_limited,text) =>{
		const id = this.state.to_id
		_fetch(url.chat_enable,{
			chat_limited,
			id,
		},'FORM')
			.then(data=>{
				if(data.success){
					Toast.info(text,1)
				}else{
					Toast.info('设置失败，请稍后再试',1)
					this.setState({switchChecked:!this.state.switchChecked})
				}
			})
	}
	handleListClick = (item)=>{
		this.socket.sendmessage(`useGoodsId/${item.id}`, 0)
		this.setState({picShow:false,modal:false})
	}
	componentDidUpdate(){
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

		//标记他人消息为已读
		const {conversation_id } = this.state
		let otherMsg = this.state.totalMsg.filter((item)=>{
			return item.from_id != this.props.user.id
		})
		let ids = []
		otherMsg.map(function(item){
			ids.push(item.id)
		})
		_fetch(url.read_message, {conversation_id,ids:'['+ids+']'})

	}
	render() {
		const {
			picShow, text, totalMsg,
			LinkIn, switchChecked,
			modal,products, loadingShow, isOpen, src
		} = this.state
		const selfHeadImg = this.props.user.headimageurl
		const {user_type} = this.props.user
		const  QRCode= this.props.QRCode
		const  otherHeadImg= LinkIn.headimageurl || this.props.chatInfo.headimageurl

		return (
			<div id="Chat">
				<div className="box" onClick={()=>this.handlePan(false)}>
					<div className={`imgView ${isOpen && 'active'}`}>
						<ReactIScroll iScroll={IScroll}>
							<img src={src} alt="" onClick={this.handleClose}/>
						</ReactIScroll>
					</div>
					<div className="warp">
						<ul>
							{loadingShow && <ActivityIndicator />}
							{/*<li className='time'>今天13:42</li>*/}
							{
								totalMsg.length>0 && totalMsg.map((item, i)=>{
									if(item.from_id == this.props.user.id){  {/*自己发送的数据*/}
										if(item.msg_type == 0){   {/*文本*/}
											if(~item.content.indexOf('useGoodsId') !== 0){
												let data = products.find(function(_item){
													return _item.id == item.content.split('/')[1]
												})
												if(data){
													return (
														<li className='right_text  clearfix' key={i}>
															<Link to={`/GoodsDetail/${data.id}`}>
																<div className="head pull-right">
																	<img src={user_type == '1' ? 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=983249201,1830044883&fm=27&gp=0.jpg' : selfHeadImg} alt=""/>
																</div>
																<div className="text pull-right" id="goodslist">
																	<div className="clearfix">
																		<div className="pull-left">
																			<img src={data.list_img} alt="" />
																		</div>
																		<div className="pull-left">
																			<p>{data.name}</p>
																			<span>￥{data.price}</span>
																		</div>
																	</div>
																</div>
															</Link>
														</li>
													)
												}
											}else{
												return (
													<li className='right_text  clearfix' key={i}>
														<div className="head pull-right">
															<img src={user_type == '1' ? 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=983249201,1830044883&fm=27&gp=0.jpg' : selfHeadImg} alt="" />
														</div>
														<div className="text pull-right">
															<span>{item.content}</span>
														</div>
													</li>
												)
											}
										}else{
											return (
												<li className='right clearfix' key={i}>
													<div className="head pull-right">
														<img src={user_type == '1' ? 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=983249201,1830044883&fm=27&gp=0.jpg' : selfHeadImg} alt=""/>
													</div>
													<div className="text pull-right">
														<img src={item.content} alt="" onClick={()=>this.imgView(item.content)}/>
													</div>
												</li>
											)
										}
									}else{
										if(item.msg_type == 0){
											if(~item.content.indexOf('useGoodsId') !== 0){
												let data = products.find(function(_item){
													return _item.id == item.content.split('/')[1]
												})
												if(data){
													return (
														<li className='left clearfix' key={i}>
															<Link to={`/GoodsDetail/${data.id}`}>
																<div className="head pull-left">
																	<img src={user_type == '0' ? 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=983249201,1830044883&fm=27&gp=0.jpg' : otherHeadImg} alt=""/>
																</div>
																<div className="text pull-left" id="goodslist">
																	<div className="clearfix">
																		<div className="pull-left">
																			<img src={data.list_img} alt="" />
																		</div>
																		<div className="pull-left">
																			<p>{data.name}</p>
																			<span>￥{data.price}</span>
																		</div>
																	</div>
																</div>
															</Link>
														</li>
													)
												}
											}else{
												return (
													<li className='left clearfix' key={i}>
														<div className="head pull-left">
															<img src={user_type == '0' ? 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=983249201,1830044883&fm=27&gp=0.jpg' : otherHeadImg} alt=""/>
														</div>
														<div className="text pull-left">
															<span>{item.content}</span>
														</div>
													</li>
												)
											}
										}else{
											return (
												<li className='left clearfix' key={i}>
													<div className="head pull-left">
														<img src={user_type == '0' ? 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=983249201,1830044883&fm=27&gp=0.jpg' : otherHeadImg} alt=""/>
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
						<textarea  value={text} onChange={(e)=>this.textChange(e)} ref='textarea' onFocus={this.handleFocus} onBlur = {this.handleBlur}/>
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
							{
								user_type == '1' && (
									<li className='pull-left' onClick={()=>{
										this.socket.sendmessage(QRCode, 1)
										this.setState({picShow:false})
									}}>
										<div>
											<img src={chatQRCode} alt=""/>
										</div>
										<span>二维码</span>
									</li>
								)
							}
							{
								user_type == '1' && (
									<li className='pull-left' onClick={()=>this.setState({modal:true})}>
										<div>
											<img src={serve1} alt=""/>
										</div>
										<span>商品推荐</span>
									</li>
								)
							}
							{
								user_type == '1' && (
									<li className='pull-left'>
										<div>
											<Switch
												checked={switchChecked}
												onChange={this.handleChecked}
											/>
										</div>
										<span>用户咨询</span>
									</li>
								)
							}
						</ul>
					</div>
					<img src={iptimg} alt="" className='iptimg'/>
				</div>
				{
					modal && (
						<div className = 'GoodsModal'>
							<div className="container">
								<h2>选择商品 <img src={del} alt="" onClick={()=>this.setState({modal:false,picShow:false})}/></h2>
								<div className="warp">
									<ReactIScroll iScroll={IScroll}>
										<ul>
											{
												products.length>0 && products.map((item,i)=>{
													return (
														<li className="clearfix" key={i} onClick={()=>this.handleListClick(item)}>
															<div className="pull-left">
																<img src={item.list_img} alt=""/>
															</div>
															<div className="pull-left">
																<p>{item.name}</p>
																<span>￥{item.price}</span>
															</div>
														</li>
													)
												})
											}
										</ul>
									</ReactIScroll>
								</div>
							</div>
						</div>
					)
				}
			</div>
		);
	}
}
