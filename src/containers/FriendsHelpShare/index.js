
import React, {Component} from 'react';
import './index.scss';
import Blank from '@/components/Blank'
import {Toast} from 'antd-mobile';
import no_points from 'static/no_points.svg'
import logo from 'static/shanger.png'
import friendHelpShareBg from 'static/friendHelpShareBg.png'
import ReactIScroll  from 'react-iscroll'
import { browserHistory } from 'react-router'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as otherAction from '@/actions/other';
import moment from 'moment'

@connect(
	state => {
		return {
			state: state.other.user,
		}
	},
	dispatch => bindActionCreators(otherAction, dispatch)
)
export default class FriendsHelpShare extends Component {
	constructor(props){
		super(props)
		this.state={
			colors:["#ffe89a", "#fe8249", '#982fcc'],
			list:[],
			base:0,
			point:0
		}
	}
	componentDidMount() {
		wxShare({
			title:'快为我助力！上儿商城积分兑好礼，宝妈们的福利来啦！',
			desc:'快为我助力，互相加”油“，上儿母婴营养品人人有份~你也来加入吧！',
			link:location.origin + '/FriendsHelpShare/' + this.props.params.token
		})
		fetch(url.users_invite_friend_point_setting+'?token='+this.props.params.token)
			.then(res=>res.json())
			.then(data=>{
				if(data.success){
					this.setState({base:data.point})
				}
			})
		this.getList()
	}

	getList = ()=>{
		fetch(url.users_invite_point+'?token='+this.props.params.token)
			.then(res=>res.json())
			.then(data=>{
				if(data.success){
					this.setState({
						point:data.point,
						list:data.list
					})
				}
			})
	}
	
	handleHelp = ()=>{
		fetch(url.users_invite_friend+'?token='+localStorage.getItem('s_token'),{
			method:'post',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			},
			body: 'from_token='+this.props.params.token
		})
			.then(res=>res.json())
			.then(data=>{
				if(data.success){
					Toast.info(<h1>助力成功!<br/><small>好友积分已+{this.state.base}</small></h1>)
					this.getList()
				}
			})
		
	}
	render() {
		const { list, base, point } =this.state
		return (
			<div className="FriendsHelpShare">
				<div className="head" style={{background: `url(${friendHelpShareBg}) center center no-repeat`,backgroundSize:'contain'}}>
					<p><span className="pull-left"><img className='logo' src={logo} alt=""/>上海儿童营养中心</span><span className="pull-right" onClick={()=>browserHistory.push('/ZhuLiRank')}>助力排行榜</span></p>
					{/*<p className='topic'>助力好友领积分，积分商城兑好礼</p>*/}
					<div onClick={this.handleHelp}>好友已获得{point}积分</div>
					<p>点击可助力好友 {base} 积分</p>
				</div>
				<div id='list'>
					<ReactIScroll iScroll={IScroll}>
						<div>
							{
								list.length>0
									?
									<ul>
										{
											list.reverse().map(function(item, i){
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
				<div className="footer">
					<div>我要赚积分</div>
				</div>
			</div>
		);
	}
}
