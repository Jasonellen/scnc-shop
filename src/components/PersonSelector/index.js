import React, {Component} from 'react';
import './index.scss';
import {Picker} from 'antd-mobile';

export default class PersonSelector extends Component {
	constructor(props){
		super(props)
		this.state={
			title:props.title,
			data:props.data,
			visible:props.visible || false,
			personValue:props.personValue,
			cols:props.cols || 1,
			str:'筛选用户'
		}
	}
	handlePersonSelect = (personValue)=>{
		let length = personValue.length
		let str=''
		let first,second,third;
		if(length >= 1){
			first = this.state.data.find(function(item){
				return item.value == personValue[0]
			})
			str = str + first.label
		}
		if(length >= 2){
			second = first.children.find(function(item){
				return item.value == personValue[1]
			})
			str = str + '-' + second.label
		}
		if(length >= 3){
			third = second.children.find(function(item){
				return item.value == personValue[2]
			})
			str = str + '-' +third.label
		}
		
		this.setState({str,personValue,visible:false},()=>{
			this.props.onChange && this.props.onChange(personValue.slice(-1)[0])
		})
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			title:nextProps.title,
			data:nextProps.data,
			visible:nextProps.visible,
			personValue:nextProps.personValue,
			cols:nextProps.cols,
		})
	}
	render() {
		const {cols, title, data, visible, personValue,str} =this.state
		return (
			<div className="PersonSelector">
				<div className='selectUser' onClick={() => this.setState({ visible: true })}>{str}</div>
				<Picker
					title = {title}
					cols={cols}
					visible={visible}
					data={data}
					value={personValue}
					onChange={v => this.handlePersonSelect(v)}
					onDismiss={() => this.setState({ visible: false })}
				/>
			</div>
		);
	}
}
