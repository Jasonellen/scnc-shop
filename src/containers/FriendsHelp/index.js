/**
 * Created by mds on 17/11/8.
 */
import React, {Component} from 'react';
import './index.scss';
import Blank from '@/components/Blank'
import no_points from 'static/no_points.svg'
import share from 'static/share.svg'
import friendHelpBg from 'static/friendHelpBg.png'
import ReactIScroll  from 'react-iscroll'
import { browserHistory } from 'react-router'
import moment from 'moment'

export default class FriendsHelp extends Component {
	state={
		colors:["#ffe89a", "#fe8249", '#982fcc'],
		list:[],
		point:0,
	}

	componentDidMount(){
		wxShare({
			title:'福利来啦，快为我助力！上儿商城积分兑好礼！',
			desc:'快为我助力，互相加”油“，上儿母婴营养品人人有份~你也来加入吧！',
			link:location.origin + '/FriendsHelpShare/' + localStorage.getItem('s_token')
		})
		this.canvasInit()
		_fetch(url.users_invite_point)
			.then(data=>{
				if(data.success){
					this.setState({
						point:data.point,
						list:data.list
					})
				}
			})
	}

	canvasInit(){
		const {colors} = this.state
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		var _width = canvas.width
		var _height = canvas.height
		var beginDot = _height*0.65
		window.requestAnimationFrame =  window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame;


		var gradient=ctx.createLinearGradient(_width/2,_height*0.6, _width/2,_height*1.05);
		gradient.addColorStop(0,colors[0]);
		gradient.addColorStop(0.48,colors[1]);
		gradient.addColorStop(1,colors[2]);

		var lines = ['#ffd586', gradient];
		var n = 0;
		var _this = this
		run()
		function run(){
			ctx.clearRect(0, 0, _width, _height);
			n++;
			for(var i = 0; i < lines.length; i++) {
				var angle = (n+i*50)*Math.PI/180;
				var deltaHeight = Math.sin(angle) * _height/8;
				var deltaHeightRight = Math.cos(angle) * _height/8;
				ctx.beginPath();
				ctx.moveTo(0, beginDot);
				ctx.bezierCurveTo(_width/4, beginDot+deltaHeight, _width*3/4, beginDot+deltaHeightRight, _width, beginDot);
				ctx.lineTo(_width, _height);
				ctx.lineTo(0, _height); //使得下班个矩形闭合
				ctx.fillStyle = lines[i];
				ctx.fill();
			}
			_this.timer = requestAnimationFrame(run);
		}
	}
	componentWillUnmount(){
		window.cancelAnimationFrame(this.timer)
	}

	render() {
		const {list,point} =this.state
		return (
			<div className="FriendsHelp">
				<h2>请点击右上角,邀请好友助力领积分。<img src={share} alt=""/></h2>
				<div className="head" style={{background: `url(${friendHelpBg}) center center no-repeat`,backgroundSize:'contain'}}>
					<span className="pull-right" onClick={()=>browserHistory.push('/ZhuLiRank')}>助力排行榜</span>
					<div className='box'>
						<canvas id='canvas'></canvas>
						<span className={String(point).length>5?'small':''}>{point || 0}</span>
					</div>
					<div className="has">已获得助力积分</div>
				</div>

				<div id='list'>
					<ReactIScroll iScroll={IScroll}>
						<div>
							{
								list.length>0
									?
									<ul>
										{
											list.map(function(item, i){
												return(
													<li key={i} className='clearfix'>
														<div className="pull-left">
															<h3>{item.name} <small>已助力</small></h3>
															<p>{moment(item.time).format('YYYY-MM-DD HH:mm')}</p>
														</div>
														<span className="pull-right">+{item.point}</span>
													</li>
												)
											})
										}
									</ul>
									: <Blank img={no_points} text="还没有好友助力哦~" imgWidth="2.67rem"/>
							}
						</div>
					</ReactIScroll>
				</div>
			</div>
		);
	}
}
