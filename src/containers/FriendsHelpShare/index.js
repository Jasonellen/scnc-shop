/**
 * Created by mds on 17/11/8.
 */
/**
 * Created by mds on 17/11/8.
 */
import React, {Component} from 'react';
import './index.scss';
import Blank from '@/components/Blank'
import {Toast} from 'antd-mobile';
import no_points from 'static/no_points.svg'
import friendHelpShareBg from 'static/friendHelpShareBg.png'
import ReactIScroll  from 'react-iscroll'

export default class FriendsHelpShare extends Component {
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
		}
	}
	handleHelp = ()=>{
		Toast.info(<h1>助力成功!<br/><small>好友积分+5</small></h1>,1)
	}
	render() {
		const {data} =this.state
		return (
			<div className="FriendsHelpShare">
				<div className="head" style={{background: `url(${friendHelpShareBg}) center center no-repeat`,backgroundSize:'contain'}}>
					<p><span className="pull-left">上海儿童营养中心</span><span className="pull-right">助力排行榜</span></p>
					<div onClick={this.handleHelp}>助力一下</div>
					<p>点击可助力好友5积分</p>
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
				<div className="footer">
					<div>我要赚积分</div>
				</div>
			</div>
		);
	}
}
