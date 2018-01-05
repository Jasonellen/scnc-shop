import React, {Component} from 'react';
import { Tabs, WhiteSpace} from 'antd-mobile';
import './index.scss'

import ReactIScroll  from 'react-iscroll'
import {_PhotoSwipe} from '@/components/_PhotoSwipe';

export default  class ZouJinShangEr extends Component {
	state={
		cover:null,
		detail:null,
		items:[
			{src: 'http://lorempixel.com/1200/900/sports/1',w:750,h:750},
		],
		isOpen:false,
		iscroll:''
	}
	componentDidMount(){
		this.get_subjects();
		this.getGuanyushanger();
		setTimeout(()=>{
			this.setState({iscroll:IScroll})
		},500)
	}

	get_subjects = ()=>{
		_fetch(url.get_subjects, {id:2})
		.then(data=>{
			this.setState({
				cover:data.cover
			})
		})
	}
	getGuanyushanger=()=>{
		_fetch(url.get_articles, {subject_id:2, page:1})
		.then(data=>{
			this.setState({
				detail:data
			})
		})
	}
	initPhotoSwipe = () =>{
		let _this = this;
		let img = this.refs.about.getElementsByTagName("img");
		for (var i=0;i<img.length;i++){
			img[i].onclick = (e)=>{
				_this.setState({
					isOpen:true,
					items:[{src: e.target.getAttribute("src"),w:750,h:750}]
				})
			}
		}
	}
	onTabChange=()=>{
		setTimeout(()=>{
			this.setState({iscroll:IScroll})
		},500)
	}
	handleClose = () => {
		this.setState({
			isOpen:false
		})
	}
	render() {
		return (
			<div className="ZouJinShangEr">
				{ this.state.cover && <img src={this.state.cover} className='headimg' alt="上儿"/> }
				{
					this.state.detail &&
					<Tabs
						defaultActiveKey='0'
						swipeable={false}
						onChange={this.onTabChange}
						>
						{
							this.state.detail.map((item,index)=>{
								return (<Tabs.TabPane tab={item.title} key={index+""}>
									<WhiteSpace />
									<div className="warp">
										<ReactIScroll iScroll={this.state.iscroll || IScroll}>
											<div className='about' ref="about" dangerouslySetInnerHTML={{__html: item.body }}></div>
										</ReactIScroll>
									</div>
								</Tabs.TabPane>)
							})
						}
					</Tabs>
				}
				<_PhotoSwipe
					isOpen={this.state.isOpen}
					onClose={this.handleClose}
					items={this.state.items}
					thumbnailContent={this.getThumbnailContent}
				/>
			</div>
		);
	}
}
