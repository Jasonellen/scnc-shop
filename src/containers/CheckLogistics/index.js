/**
 * Created by shaolong on 2017/5/24.
 */
import React, {Component} from 'react';
import Logistics from '@/components/Logistics'
import {connect} from 'react-redux';

@connect(
	state => {
		return {
			state:state.shipping,
		}
	},
	null
)
export default class CheckLogistics extends Component{

	render(){
		return <Logistics {...this.props.state}/>
	}
} 

