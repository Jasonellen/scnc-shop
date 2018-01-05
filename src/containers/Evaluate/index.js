import React, {Component} from 'react';
import './index.scss'
import ReactIScroll  from 'react-iscroll'
import { Button, Toast, ActivityIndicator } from 'antd-mobile';
import EvaluateComponent from '@/components/EvaluateComponent';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as evaluateAction from '@/actions/evaluate.js';
import {browserHistory} from 'react-router'

@connect(
	state=>{
		return{
			state:state.evaluate,
		}
	},
	dispatch => bindActionCreators(evaluateAction, dispatch)
)
export default class Evaluate extends Component {
	constructor(){
		super()
		this.state={
			loadingShow:false
		}
	}
	componentDidMount() {
		const totalData = this.props.location.query
		const order_no = totalData.order_no
		const data = JSON.parse(totalData.list)  //商品数组列表
		this.props.initialSaveComments(data,order_no)
	}

	//评价
	handleSubmit=()=>{
		this.setState({loadingShow:true})
		let data = this.props.state.save_comments
		data.map((item)=>{
			let formData = new FormData()
			formData.append('token', localStorage.getItem('s_token'))
			formData.append('order_no', item.order_no)
			formData.append('product_id', item.product_id)
			formData.append('property_id', item.property_id)
			formData.append('content', item.content)
			formData.append('point', item.point)
			formData.append('anonymous', 0)
			item.picture.length>0 && item.picture.map(function(_item){
				formData.append('picture[]', _item)
			})
			fetch(url.save_comments, {
				method: 'POST',
				body: formData
			})
				.then(res=>res.json())
				.then(data=>{
					if(data.success == true){
						this.setState({loadingShow:false})
						Toast.info('评价成功!',1)
						browserHistory.push('/myOrder/1')
					}
				})

		})
	}

	render() {
		const totalData = this.props.location.query
		const data = JSON.parse(totalData.list)  //商品数组列表
		return (
			<ReactIScroll iScroll={IScroll}>
				<div className="Evaluate">
					{
						data && data.map((item,i)=>{
							return <EvaluateComponent key={i} list = {item}/>
						})
					}
					<ActivityIndicator
            toast
            text="评价中..."
            animating={this.state.loadingShow}
          />
					<Button
						className='btn active'
						onClick = {this.handleSubmit}
					>保存</Button>
				</div>

			</ReactIScroll>
		);
	}
}

