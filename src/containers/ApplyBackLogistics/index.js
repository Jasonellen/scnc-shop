/**
 * Created by shaolong on 2017/5/24.
 */
import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router'
import './index.scss';
import Logistics from '@/components/Logistics'
import _Popover from '@/components/Popover'
import {connect} from 'react-redux';


@connect(
	state => {
		return {
			state:state.applyBackLogistics,
		}
	},
	null
)
export default class ApplyBackLogistics extends Component {


	render() {
		const data = this.props.state
		return (
			<div className="ApplyBackLogistics">
				<Logistics {...data}/>
				<div className="bottom clearfix">
					<_Popover>
						<span>咨询</span>
					</_Popover>
					<div className="pull-right">
						<Link to='/myOrder/1' className="cancel">返回我的订单</Link>
						<div className="ok"  onClick={()=>browserHistory.push('/ApplyBackLogisticsEdit')}>修改快递</div>
					</div>
				</div>
			</div>
		)
	}
}
