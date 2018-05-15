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
import sing from "static/sing.svg"
import keyinput from "static/keyinput.svg"
import sound from "static/sound.svg"
import voice from "static/voice.svg"
import voice1 from "static/voice1.svg"

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
			page:0,
			loadingShow:false,
			src:'',
			isOpen:false,
			OS:'',
			voiceShow:false, //话筒显示
			voiceSelect:false, //话筒图标点击
			voiceText:'按住说话',
			scrollOnOff:true,//是否开启滚动
		}
	}
	componentDidMount(){
		//判断IOS 系统版本
		var OS = window.navigator.userAgent.match(/\d+_\d[_\d]?/g);
		if(OS){
			this.setState({OS:OS[0].split('_')[0]})
		}
		this.getGoodsData()
		this.getChatInfos()
	}

	//获取商品列表
	getGoodsData = ()=>{
		_fetch(url.home)
			.then(data=> {
				this.setState({
					products: data.products,
				})
			})
	}
	//获取聊天室信息
	getChatInfos=()=>{
		const {LinkIn} = this.state
		//获取聊天室
		const from_id = LinkIn.from_id || this.props.user.id  //获取聊天室的 from_id 和 发送消息的不一样
		const to_id = LinkIn.to_id || ''
		console.log('当前用户id:',this.props.user.id)
		console.log('获取聊天室使用的from_id:',from_id)
		console.log('获取聊天室使用的to_id:',to_id)

		_fetch(url.get_conversation, {from_id,to_id})
			.then(data=>{
				if(data.success){
					this.props.changeChatInfo(data)
					this.setState({
						conversation_id:data.conversation_id,
						to_id:LinkIn.from_id || data.to_id
					},()=>{
						this.startSocket()
						//获取历史记录
						this.getMessage()
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
			let socketUrl
			if(location.host == 'm.scnc-sh.com')socketUrl = 'wss://m.scnc-sh.com/cable';
			if(location.host == 'scnc.mdslife.com')socketUrl = 'ws://scnc.mdslife.com/cable';
			if(process.env.NODE_ENV == 'development'){
				if(_dev_api){
					socketUrl = 'ws://scnc.mdslife.com/cable'
				}else{
					socketUrl = 'wss://m.scnc-sh.com/cable'
				}
			}
			// const WebSocket = require('ws');  package安装后就可以使用了，不可以再引用，不然报错...不安装接收不到广播消息..
			this.socket.ws = new WebSocket(socketUrl, ["actioncable-v1-json", "actioncable-unsupported"]);
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
					this.setState({totalMsg,scrollOnOff:true,})
					console.log('接受聊天室推送的消息：', event)
				}
			};
		}
		this.socket.connect_server();
	}
	//获取历史消息
	getMessage = ()=>{
		this.setState({loadingShow:true,page:this.state.page+1},()=>{
			const {conversation_id,page} = this.state
			_fetch(url.get_message,{
				conversation_id,
				page
			})
				.then(data=>{
					this.setState({loadingShow:false})
					if(data.length>0){
						this.setState({totalMsg:data.concat(this.state.totalMsg)},()=>{
							this.setState({scrollOnOff:false})
						})
					}else{
						this.state.totalMsg.length>0 && Toast.info('没有更多数据了',1)
					}
				})
		})
	}
	//展开面板
	handlePan=(value)=>{
		this.setState({picShow:value},()=>{
			document.getElementById('Chat').scrollTop = document.getElementById('Chat').scrollHeight;
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
	//图片放大
	imgView = (src)=>{
		this.setState({
			isOpen:true,
			src
		})
	}
	handleClose = ()=>{
		this.setState({isOpen:false})
	}
	//切换语言输入
	handleVoice = ()=>{
		this.setState({voiceSelect:!this.state.voiceSelect})
	}
	//按下说话
	handleTouchStart = ()=>{
		document.oncontextmenu = function(event){
			event.returnValue = false;
		};

		var _this = this
		this.setState({voiceText:'松开发送',voiceShow:true},()=>{
			wx.startRecord({
				cancel: function () {
					alert('用户拒绝授权录音');
				}
			});
			this.recordStartTime = new Date().getTime()
		})

		//监听录音自动停止
		wx.onVoiceRecordEnd({
			complete: function (res) {
				this.setState({voiceText:'按住说话',voiceShow:false},()=>{
				//上传语音
					wx.uploadVoice({
						localId:res.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
						isShowProgressTips: 0, // 默认为1，显示进度提示
						success: function (re) {
							// console.log(res.serverId,'已上传wx服务器')
							_fetch(url.download,{server_id:re.serverId})
								.then(data=>{
									if(data){
										_this.socket.sendmessage(re.serverId, 2)
									}
								})
						}
					});
				})
			}
		});
	}
	//松开发送
	handleTouchEnd = ()=>{
		var _this = this
		this.state.voiceShow && this.setState({voiceText:'按住说话',voiceShow:false},()=>{
			this.recordEndTime = new Date().getTime()
			if(this.recordEndTime - this.recordStartTime > 1000){
				wx.stopRecord({
					success: function (res) {
						// console.log('录音id:',localId)
						var localId = res.localId;
						//播放语音
						//wx.playVoice({
						//   localId // 需要播放的音频的本地ID，由stopRecord接口获得
						// });
						//上传语音
						wx.uploadVoice({
							localId, // 需要上传的音频的本地ID，由stopRecord接口获得
							isShowProgressTips: 0, // 默认为1，显示进度提示
							success: function (re) {
								_fetch(url.download,{server_id:re.serverId})
									.then(data=>{
										if(data){
											console.log('语音接口调用成功：',data)
											_this.socket.sendmessage(re.serverId, 2)
										}
									})
							}
						});
					}
				});
			}else{
				Toast.info('录音时间太短！',1)
			}
		})
	}
	//播放video
	playVideo = (e)=>{
		var audio = ''
		var svg = ''
		// //如果点击的是图片
		if(e.target.tagName == 'IMG'){
			audio = e.target.previousSibling
			svg = e.target
		}else{
			audio = e.target.childNodes[0]
			svg = e.target.childNodes[1]
		}
		audio.load()
		audio.play()
		svg.src=voice1
		audio.onended = function() {
			svg.src=voice
		};
	}

	onRefresh = (x)=>{
		const { maxScrollY, scrollOnOff} = this.state
		if((maxScrollY !== x.maxScrollY) && scrollOnOff){
			this.setState({maxScrollY:x.maxScrollY})
			this.refs.iScroll.withIScroll(function(iScroll) {
				iScroll.scrollTo(0,x.maxScrollY, 400, {
					style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
					fn: function (k) {
						return k * ( 2 - k );
					}
				})
			})
		}
	}
	onScroll = (iscroll)=>{
		clearTimeout(this.timer)
		this.timer = setTimeout(()=>{
			if(iscroll.y >= 0){
				this.getMessage()
			}
		},300)
	}

	componentWillUnmount(){
		this.socket.ws.close()

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
			picShow, text, totalMsg, switchChecked,
			modal,products, loadingShow, isOpen, src
		} = this.state
		const selfHeadImg = this.props.user.headimageurl
		const {user_type} = this.props.user
		const  QRCode= this.props.QRCode
		let  otherHeadImg= ''
		if(user_type == '0'){
			otherHeadImg= this.props.chatInfo.headimageurl
		}else{
			otherHeadImg= this.props.chatInfo.from_headimageurl
		}
		const {voiceShow,voiceText,voiceSelect} = this.state
		return (
			<div id="Chat">
				<div className="box" onClick={()=>this.handlePan(false)}>
					<div className={`imgView ${isOpen && 'active'}`}>
						<ReactIScroll iScroll={IScroll}>
							<img src={src} alt="" onClick={this.handleClose}/>
						</ReactIScroll>
					</div>
					{
						voiceShow && <div className="voiceModal">
													<img src={sing} alt=""/>
												</div>
					}
					<div className="warp">
					<ReactIScroll
						ref="iScroll"
						iScroll = {IScroll}
						onRefresh = {this.onRefresh}
						onScroll={this.onScroll}
						options={{probeType:2,}}
					>
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
																<div className="text pull-right" id="goodslist_right">
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
										}else if(item.msg_type == 1){
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
										}else{
											return(
												<li className='right_text  voice_send clearfix' key={i}>
													<div className="head pull-right">
														<img src={user_type == '1' ? 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=983249201,1830044883&fm=27&gp=0.jpg' : selfHeadImg} alt="" />
													</div>
													<div className="text pull-right" onClick={this.playVideo}>
														<audio src={item.content}></audio>
														<img src={voice} alt="" className='voice_send_img'/>
														<span></span>
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
										}else if(item.msg_type == 1){
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
										}else{
											return (
												<li className='left voice_send clearfix' key={i}>
													<div className="head pull-left">
														<img src={user_type == '1' ? 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=983249201,1830044883&fm=27&gp=0.jpg' : selfHeadImg} alt="" />
													</div>
													<div className="text pull-left" onClick={this.playVideo}>
														<audio src={item.content}></audio>
														<img src={voice} alt="" className='voice_send_img'/>
														<span></span>
													</div>
												</li>
											)
										}
									}
								})
							}
							
						</ul>
					</ReactIScroll>
					</div>
				</div>
				<div className="bottom">
					<div className="head" ref = 'ipt'>
						<img src={voiceSelect ? keyinput : sound} alt="" onClick={this.handleVoice}/>
						{
							voiceSelect && <textarea
															className='voice_text'
															disabled
															value={voiceText}
															onTouchStart={this.handleTouchStart}
															onTouchEnd={this.handleTouchEnd}
															style={{background:voiceText == '松开发送' && '#ddd'}}
														/>
						}
						{!voiceSelect && <textarea  value={text} onChange={(e)=>this.textChange(e)} ref='textarea' onClick={this.handleFocus} onFocus={this.handleFocus} />}
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
												platform="ios"
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
