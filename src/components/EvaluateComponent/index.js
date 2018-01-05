import React, {Component} from 'react';
import './index.scss'
import { ImagePicker} from 'antd-mobile';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as evaluateAction from '@/actions/evaluate.js';

import star1 from 'static/star.svg'
import star2 from 'static/star1.svg'

@connect(
	state=>{
		return{
			state:state.evaluate
		}
	},
	dispatch => bindActionCreators(evaluateAction, dispatch),
)
export default class EvaluateComponent extends Component {
	constructor(props){
		super(props)
		this.state = {
			star:[1,1,1,1,1], //星星
			content:[
				'生气，不开心',
				'有点失望',
				'一般，望改进',
				'喜欢，还不错',
				'超赞！非常好',
			],
			index:5, //黄色星星起始下标
			value:'', // 文本框的值
			files:[], //图片
			data:props.list
		}
	}

	starIndexUp=(i)=>{
		const {star,data} =this.state
		let newStar = [...star]
		star.map((item,index)=>{
			newStar[index] = index<=i ? 1 : 0
		})
		let index = newStar.filter(function(item){
			return item == 1
		}).length
		this.setState({star:newStar,index})

		this.props.changePoint(data.item_id, index)
	}

	onFileChange = (files) => {
		// console.log(files, type, index);
		const {data} = this.state
		let picture = []
		this.setState({files}, ()=>{
			files.map((item)=>{
				picture.push(item.file)
			})
			this.props.changeFile(data.item_id, picture)
		});
	}
	
	handleText=(e)=>{
		const {data} = this.state
		this.props.changeContent(data.item_id, e.target.value)

	}
	render() {
		const {files,star,data, content, index} = this.state
		return (
			<div className="EvaluateComponent">
				<ul>
					<li>
						<div className="head clearfx">
							<img src="https://ss2.bdstatic.com/8_V1bjqh_Q23odCf/pacific/upload_11110547_1492659226421.jpg" alt="" className='pull-left left'/>
							<div className="pull-left right">
								<h3>{data.name}</h3>
								<div className='content'>
									<div className='comment'>
										<div className='first'>评分：</div>
										<div>
										{
											star.map((item, i)=>{
												return <img src={item == 1 ? star2 : star1} alt="" key={i} onClick={()=>this.starIndexUp(i)}/>
											})
										}
										</div>
									</div>	
									<span className='des'>{content[index-1]}</span>
								</div>
							</div>
						</div>
						<div className="body">
							<textarea placeholder='如有其它说明，请在此填写' rows="8" onChange={this.handleText}></textarea>
							<ImagePicker
								files={files}
								onChange={this.onFileChange}
								onImageClick={(index, fs) => console.log(index, fs)}
								selectable={files.length < 4}
							/>
						</div>
					</li>
				</ul>
			</div>			
		);
	}
}

