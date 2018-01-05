import React, {Component} from 'react';
import {ActivityIndicator} from 'antd-mobile';
import './index.scss'

export default  class UpPull extends Component {
	constructor(props){
		super(props)
		this.state = {
			hasMore:props.hasMore,
			isLoading:props.isLoading,
			iscroll:props.iscroll,
			Height:document.documentElement.clientHeight || document.body.clientHeight
		}
	}
	componentDidMount() {
		setTimeout(()=>{
			this.setState({
				offsetTop:this.loadingDiv && this.loadingDiv.offsetTop
			})
		},1000)

		const _this = this
		this.state.iscroll && this.state.iscroll.on('scroll', function(){
			if(!_this.state.isLoading && _this.state.hasMore && this.y < this.maxScrollY - 100){  //下拉一定距离才请求
				_this.setState({isLoading:true}, ()=>{
					_this.props.onLoading && _this.props.onLoading()
				})
			}
		});
	}

	componentWillReceiveProps(nextProps) {
		setTimeout(()=>{
			this.setState({
				isLoading:nextProps.isLoading,
				hasMore:nextProps.hasMore,
				iscroll:nextProps.iscroll,
				offsetTop:this.loadingDiv && this.loadingDiv.offsetTop  //重新计算高度,确认是否要显示上拉字体
			})
		},0)

		const _this = this
		nextProps.iscroll && nextProps.iscroll.on('scroll', function(){
			if(!_this.state.isLoading && _this.state.hasMore && this.y < this.maxScrollY - 100){  //下拉一定距离才请求
				_this.setState({isLoading:true}, ()=>{
					setTimeout(()=>{
						_this.props.onLoading && _this.props.onLoading()
					},1000)
				})
			}
		});
	}

	render() {
		const {hasMore, isLoading, Height,offsetTop} = this.state
		const show = offsetTop > Height ? true : false
		return (
			<div 
				className="UpPull"
				ref = {(x)=>{this.loadingDiv = x}}
			>
				{
					show && (
						hasMore
						? (isLoading
							? <ActivityIndicator text="加载中.." size='small'/>
							: <div className="text">上拉查看更多数据</div>)
						: <div className="text">没有更多数据了</div>
					)
				}
			</div>
		);
	}
}
