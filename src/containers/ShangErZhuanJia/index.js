import React, {Component} from 'react';
import { Tabs, WhiteSpace} from 'antd-mobile';
import './index.scss'

//图片
import ReactIScroll  from 'react-iscroll'
import _PhotoSwipe  from 'jasonellen-reactphotoswipe';

export default  class ShangErZhuanJia extends Component {
	state={
		cover:null,
		detail:[],
		user:[],
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
		this.getScncUsers();
		setTimeout(()=>{
			this.initPhotoSwipe()
		},700)
	}
	get_subjects = ()=>{
		_fetch(url.get_subjects, {id:5})
		.then(data=>{
			console.log(data)
			this.setState({
				cover:data.cover
			})
		})
	}
	getGuanyushanger=()=>{
		_fetch(url.get_articles, {subject_id:5, page:1})
		.then(data=>{
			this.setState({
				detail:data
			})
		})
	}
	getScncUsers=()=>{
		_fetch(url.scnc_users)
		.then(data=>{
			this.setState({
				user:data
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
			<div className="ShangErZhuanJia" ref="about">
				{ this.state.cover && <img src={this.state.cover} className='headimg' alt="上儿专家委员会"/> }
				<Tabs
					defaultActiveKey='0'
					swipeable={false}
					onChange={this.onTabChange}
					pageSize={2}
					>
						{
							this.state.detail.length >0 &&this.state.detail.map((item,index)=>{
								return (<Tabs.TabPane tab={item.title} key={index+""}>
									<WhiteSpace />
									<div className="warp">
										<ReactIScroll iScroll={IScroll} ref = {x=>this.Scroll = x}>
											<div className='about'  dangerouslySetInnerHTML={{__html: item.body }}></div>
										</ReactIScroll>
									</div>
								</Tabs.TabPane>)
							})
						}
						<Tabs.TabPane tab="成员信息" key={this.state.detail.length}>
							<WhiteSpace />
							<div className="warp">
								<ReactIScroll iScroll={IScroll}>
									<div className='list' ref="about">
										{this.state.user && this.state.user.map((item,index)=>{
											return <div className="item clearfix" key={index}>
												<div className="left">
													<img src={item.avatar} />
												</div>
												<div className="right">
													<p>{item.name}<i>({item.title})</i></p>
													<span>{item.school}</span>
												</div>
											</div>
										})}
									</div>
								</ReactIScroll>
							</div>
						</Tabs.TabPane>
				</Tabs>
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
