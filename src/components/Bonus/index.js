import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './index1.scss';
import DataSelector from '@/components/DataSelector'
import Blank from '@/components/Blank'

export default class Bonus extends Component {
	constructor(props){ 
		super(props)
		this.state={
			text:props.text,
			data:props.data,
			colors:props.colors,
			bg:props.bg,
			type:props.type,   //0积分，1推荐积分
			score:props.score,
		}
	}
	static defaultProps = {
		colors:["#ffe89a", "#fe8249", '#982fcc']
	}
	static propTypes = {
		bg: PropTypes.string.isRequired,
		data: PropTypes.array.isRequired,
		colors: PropTypes.array.isRequired,
	};

	componentDidMount(){
		this.canvasInit()
		setTimeout(()=>{
			if(this.state.data.length>0){
				new IScroll('#list')
			}
		},500)
	}
	componentDidUpdate(){
		setTimeout(()=>{
			this.scroll&&this.scroll.refresh()
		}, 0);		
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			data:nextProps.data,
			score:nextProps.score
		})
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
		this.scroll = null
	}
	//获取当月的数据
	handleSelect = (date)=>{
		if(date){
			let starttime = date.replace('年','-').replace('月','-1')
			let endIndex = date.indexOf('月')
			let year = 	date.slice(0,4)
			let month = Number(date.slice(5,endIndex))
			let endtime = `${year}-${Number(month)+1}-1`
			_fetch(url.point_logs_month,{point_type:this.state.type,starttime,endtime})
				.then(data=>{
					this.setState({data})
				})
		}else{
			//查看全部
			_fetch(url.point_logs,{point_type:this.state.type})
				.then(data=>{
					this.setState({data})
				})
		}
	}
	render() {
		const {data, text, bg, score} =this.state
		return (
			<div className="MyBonus">
				<div className="head" style={{background: `url(${bg}) center center no-repeat`,backgroundSize:'contain'}}>
					<div>
						<canvas id='canvas'></canvas>
						<span className={String(score).length>5?'small':''}>{score || 0}</span>
					</div>
				</div>
				<div id='list'>
				{
					data.length>0
					?
						<ul>
							{
								data.map(function(item, i){
									return(
										<li key={i} className='clearfix'>
											<div className="pull-left">
												<h3>{item.name}：{item.log_data}</h3>
												<p>{item.created_at.slice(0,16).replace('T',' ')}</p>
											</div>
											<span className="pull-right">{item.point}</span>
										</li>
									)
								})
							}
						</ul>
					: <Blank />
				}
				</div>
				<DataSelector
						text={text}
						onDataChange={this.handleSelect}
				/>
			</div>
		);
	}
}
