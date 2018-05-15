import React, {Component} from 'react';
import './index.scss';
import {DatePicker, List} from 'antd-mobile';
import moment from 'moment';
const maxDate = moment('2025-12-12 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2017-1-1 +0800', 'YYYY-MM-DD Z').utcOffset(8);

export default class DataSelector extends Component {
	constructor(props){
		super(props)
		this.state={
			text:props.text,
			content: props.text
		}
	}

	handleDateChange=(date)=>{
		this.setState({
			content:date.format('YYYY年M月')
		},()=>{
			this.props.onDataChange&&this.props.onDataChange(this.state.content)
		})
	}
	handleSeeAll=()=>{
		this.setState({
			content:this.state.text
		},()=>{
			this.props.onDataChange&&this.props.onDataChange('')
		})
	}
	render() {
		const {content, text} =this.state
		return (
			<div className="DataSelector">
				<DatePicker
					mode="date"
					title="选择日期"
					minDate={minDate}
					maxDate={maxDate}
					onChange={this.handleDateChange}
				>
					<List.Item arrow="horizontal">{content}</List.Item>
				</DatePicker>
				{
					content !== text
					? <div
							className="float"
							onClick={this.handleSeeAll}>全部日期
						</div>
					: <div></div>
				}
			</div>
		);
	}
}
