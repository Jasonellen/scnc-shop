import React, {Component} from 'react';
import { Tabs, WhiteSpace} from 'antd-mobile';
import './index.scss'
import ReactIScroll  from 'react-iscroll'
import _PhotoSwipe  from 'jasonellen-reactphotoswipe';

export default  class ShangErYanJiuYuan extends Component {
	state={
		cover:null,
		detail:null,
		items:[
			{
				src: 'http://lorempixel.com/1200/900/sports/1',
				w: 1200,
				h: 900,
				title: 'Image 1'
			},
		],
		isOpen:false
	}
	componentDidMount(){
		this.get_subjects();
		this.getGuanyushanger();
		setTimeout(()=>{
			this.initPhotoSwipe()
		},700)
	}

	get_subjects = ()=>{
		_fetch(url.get_subjects, {id:3})
		.then(data=>{
			this.setState({
				cover:data.cover
			})
		})
	}
	getGuanyushanger=()=>{
		_fetch(url.get_articles, {subject_id:3, page:1})
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
			img[i].onload = function(){
				_this.Scroll.refresh()
			}
			img[i].onclick = function(e){
				_this.setState({
					isOpen:true,
					items:[{src: e.target.getAttribute("src"),w:this.offsetWidth,h:this.offsetHeight}]
				})
			}
		}
		this.setState({}) // 更新页面
	}
	onTabChange=()=>{
		setTimeout(()=>{
			this.initPhotoSwipe()
		},700)
	}
	handleClose = () => {
		this.setState({
			isOpen:false
		})
	}
	render() {
		return (
			<div className="ShangErYanJiuYuan" ref="about">
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
										<ReactIScroll iScroll={IScroll} ref = {x=>this.Scroll = x}>
											<div className='about' dangerouslySetInnerHTML={{__html: item.body }}></div>
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

