import React, {Component} from 'react';
import './index.scss';

export default class Record extends Component {
	constructor(props){
		super(props)
		this.state={
			localId:''
		}
	}
	componentDidMount() {
		_fetch(url.share,{url:location.href})
		.then(data=>{
			wx.config({
				debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.appId,
				timestamp: String(data.timestamp),
				nonceStr: data.noncestr,
				signature: data.sign,
				jsApiList:['startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice','translateVoice'],
			});

			wx.error(function(res){
				console.log('fail-----------',res)
			});

		})
	}
	handleStartRecord = () =>{
		wx.startRecord();
	}
	hadnleStopRecord = () => {
		wx.stopRecord({
			success: function(res){
				this.setState({localId:res.localId})
			}
		});
	}
	handleRunRecord = () => {
		wx.playVoice({
			localId:this.state.localId
		});
	}
	render() {
		return (
			<div className="Record">
				<div onClick={this.handleStartRecord}>开始录音</div>
				<div onClick={this.hadnleStopRecord}>停止录音</div>
				<div onClick={this.handleRunRecord}>播放录音</div>
			</div>
		);
	}
}
