import React, {Component} from 'react';
import Bonus from '@/components/Bonus'
import {connect} from 'react-redux';
import bg from 'static/recommendBonusBg.png'

@connect(
	state => {
		return {
			user:state.other.user
		}
	}
)
export default class RecommendBonus extends Component {
	constructor(props){
		super(props)
		this.state={
			text:'全部记录',
			data:[],
			colors:["rgb(254,201,173)", "orange", 'rgb(255,95,7)'],
			bg:bg,
			type:1,
			score:props.user.recommend_point
		}
	}
	componentDidMount(){
		//获取所有积分列表
		_fetch(url.point_logs,{point_type:1})
			.then(data=>{
				this.setState({
					data,
				})
			})
	}
	render() {
		return (
			<Bonus {...this.state}/>
		);
	}
}
