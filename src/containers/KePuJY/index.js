/**
 * Created by mds on 17/10/31.
 */
import React, {Component} from 'react';
import './index.scss'
import {WhiteSpace, Toast} from 'antd-mobile'
import { Link, browserHistory} from 'react-router'
import ReactIScroll  from 'react-iscroll'

export default class KePuJY extends Component {
	constructor(props){
		super(props)
		this.state={
			data:[], //文章列表
			page:1,
			child_subject:[],
			subject_id:'',
			title_id:6, //育儿的id
			display:'block'
		}
	}
	componentDidMount(){

		this.getArticles()
			.then(data=>{
				this.setState({data})
			})
		this.handleSubject(6) //获取育儿下面的栏目

		browserHistory.listen((location)=>{
			if(location.action == 'POP'){
				this.setState({display:'none'})
			}else{
				this.setState({display:'block'})
			}
		})
	}

	//动态设置水平滚动宽度
	setWidth= ()=> {
		setTimeout(()=>{
			var li = document.querySelectorAll('.horizontal li')
			var ul = document.querySelector('.horizontal')
			var width = 0
			for(var i=0;i<li.length;i++){
				width += li[i].offsetWidth
			}
			ul.style.width = width + 50 + 'px' //50作为误差值吧
		},0)
	}

	handleLoading = (iscroll)=>{
		if(!iscroll.maxScrollY) return;
		if(!this.fetching && (iscroll.y <= iscroll.maxScrollY )){
			if(this.noMore){
				Toast.info('没有更多数据了！',1);
				return
			}
			this.fetching = true
			this.setState({page:this.state.page+1}, ()=>{
				if(this.state.subject_id){
					this.getArticles()
						.then(data=>{
							if(data.length>0){
								this.fetching = false
								this.setState({data:this.state.data.concat(data)})
							}else{
								Toast.info('没有更多数据了！',1)
								this.fetching = false
								this.noMore = true
							}
						})
				}else{
					this.getArticles(true)
						.then(data=>{
							if(data.length>0){
								this.fetching = false
								this.setState({data:this.state.data.concat(data)})
							}else{
								Toast.info('没有更多数据了！',1)
								this.fetching = false
								this.noMore = true
							}
						})
				}

			})
		}
	}

	//一级栏目点击
	handleSubject = (title_id)=>{
		this.setState({title_id,page:1,subject_id:'',hasMore:true,isLoading:false},()=>{
			_fetch(url.get_subjects,{id:this.state.title_id})
				.then(data=>{
					this.setState({child_subject:[{id:'',name:'全部'}].concat(data.child_subject)},()=>{
						this.setWidth()
						this.getArticles(true)
							.then(data=>{
								this.setState({data})
							})
					})
				})
		})
	}


	//二级栏目点击
	handleArticle = (subject_id)=>{
		this.setState({subject_id,page:1,hasMore:true,isLoading:false},()=>{
			if(subject_id == ''){
				this.getArticles(true)
					.then(data=>{
						this.setState({data})
					})
			}else{
				this.getArticles()
					.then(data=>{
						this.setState({data})
					})
			}
		})
	}

	//获取文章
	getArticles = (is_parent) =>{
		const {title_id,subject_id, page} = this.state
		if(is_parent){
			return _fetch(url.get_articles, {subject_id:title_id, page,is_parent:1})
		}else{
			return _fetch(url.get_articles, {subject_id, page})
		}
	}

	render() {
		const {data, subject_id, title_id,child_subject,display} =this.state
		const reTag = /<img(?:.|\s)*?>/g;
		const wihteSpace = /<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/ig;
		return (
			<div className="KePuJY">
				<div className="head">
					<h1>
						<span className={(title_id==6) && 'active'} onClick={()=>this.handleSubject(6)}>育儿</span>
						<span className={(title_id==7) && 'active'} onClick={()=>this.handleSubject(7)}>孕期</span>
					</h1>
					<ReactIScroll iScroll={IScroll} options={{scrollX:true, scrollY: false}}>
						<ul className="clearfix horizontal">
							{
								child_subject.length>0 && child_subject.map((item,i)=>{
									return (
										<li key={i} className="pull-left" onClick={()=>this.handleArticle(item.id)}>
											<span className={(item.id === subject_id) && "active"}>{item.name}</span>
										</li>
									)
								})
							}
						</ul>
					</ReactIScroll>
				</div>
				<WhiteSpace />
				<div className="list">
				<ReactIScroll 
					iScroll={IScroll} 
					options={{probeType: 3}}
					onScroll = {this.handleLoading}
				>
					<ul>
						{
							data.length>0 && data.map((item,i)=>{
								return(
									<li key={i} className='clearfix'>
										<div style={{overflow:'hidden'}}>
											<Link to={`/KePuJY/${item.id}`}>
												<img src={item.cover} alt=""/>
												<div className='pull-right' ref = 'body'>
													<h2>{item.title}</h2>
													<div className="time">{item.created_at.slice(0,10)}</div>
													<p className='content' dangerouslySetInnerHTML={{__html: item.body.replace(reTag,'').replace(wihteSpace,'') }}></p>
												</div>
											</Link>
										</div>
									</li>
								)
							})
						}
					</ul>
				</ReactIScroll>
				</div>
				<div style={{display,width:'100%',height:'100%'}}>
					{this.props.children}
				</div>
			</div>
		);
	}
}
