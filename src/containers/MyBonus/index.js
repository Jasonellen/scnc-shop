import React, {Component} from 'react';
import Bonus from '@/components/Bonus'
import {connect} from 'react-redux';
import bg from 'static/bonusBg.png'

@connect(
	state => {
		return {
			user:state.other.user
		}
	}
)
export default class MyBonus extends Component {
	constructor(props){
		super(props)
		this.state={
			text:'全部记录',
			data:[],
			colors:["#ffe89a", "#fe8249", '#982fcc'],
			bg:bg,
			type:0,
			score:props.user.point
		}
	}
	componentDidMount(){
		//获取所有积分列表
		_fetch(url.point_logs,{point_type:0})
			.then(data=>{
				this.setState({
					data,
				})
			})
	}
	render() {
		return (
			<div>
				<Bonus {...this.state}/>
			</div>
			
		);
	}
}
