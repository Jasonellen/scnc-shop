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

export default class FriendsHelp extends Component {
	constructor(props){
		super(props)
		this.state={
			colors:["#ffe89a", "#fe8249", '#982fcc'],
			data:[
				{name:'张三',created_at:'xxxxxxTxxxx',point:5},
				{name:'张三',created_at:'xxxxxxTxxxx',point:5},
				{name:'张三',created_at:'xxxxxxTxxxx',point:5},
				{name:'张三',created_at:'xxxxxxTxxxx',point:5},
				{name:'张三',created_at:'xxxxxxTxxxx',point:5},
				{name:'张三',created_at:'xxxxxxTxxxx',point:5},
				{name:'张三',created_at:'xxxxxxTxxxx',point:5},
				{name:'张三',created_at:'xxxxxxTxxxx',point:5},
				{name:'张三',created_at:'xxxxxxTxxxx',point:5},
			],
			score:234,
		}
	}

	componentDidMount(){
		this.canvasInit()
	}

	canvasInit(){
		const {colors} = this.state
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		var _width = canvas.width
		var _height = canvas.height
		var beginDot = _height*0.8
		window.requestAnimationFrame =  window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame;


		var gradient=ctx.createLinearGradient(_width/2,_height*0.7, _width/2,_height*1.05);
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
		const {data,score} =this.state
		return (
			<div className="FriendsHelp">
				<h2>请点击右上角,邀请好友助力领积分。<img src={share} alt=""/></h2>
				<div className="head" style={{background: `url(${friendHelpBg}) center center no-repeat`,backgroundSize:'contain'}}>
					<div>
						<canvas id='canvas'></canvas>
						<span className={String(score).length>5?'small':''}>{score || 0}</span>
					</div>
				</div>

				<div id='list'>
					<ReactIScroll iScroll={IScroll}>
						<div>
							{
								data.length>0
									?
									<ul>
										{
											data.map(function(item, i){
												return(
													<li key={i} className='clearfix'>
														<div className="pull-left">
															<h3>{item.name} <small>已助力</small></h3>
															<p>{item.created_at.slice(0,16).replace('T',' ')}</p>
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
