import React, {Component} from 'react';
import './index.scss'
import { Link} from 'react-router'
import {Toast} from 'antd-mobile'
import ReactIScroll  from 'react-iscroll'

export default class ZhuanLan extends Component {
	constructor(props){
		super(props)
		this.state={
			data:[],
			isLoading:false,
			hasMore:true,
			page:1,
			subject_id:props.params.id
		}
	}
	componentDidMount(){
		this.getArticles()
			.then(data=>{
				this.setState({data})
			})
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
				this.getArticles()
					.then(data=>{
						if(data.length>0){
							this.fetching = false
							this.setState({data:this.state.data.concat(data)})
						}else{
							this.fetching = false
							this.noMore = true
							Toast.info('没有更多数据了！',1)
						}
					})
			})
		}
	}

	getArticles = () =>{
		const {subject_id, page} = this.state
		return _fetch(url.get_articles, {subject_id, page})
	}

	componentDidUpdate(){
		setTimeout(()=>{
			this.scroll&&this.scroll.refresh()
		},0)
	}
	componentWillUnmount(){
		this.scroll = null
	}
	render() {
		const { data } =this.state
		return (
			<div className="ZhuanLan">
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
										<Link to={`/ZhuanLanDetail/${item.id}`}>
											<img src={item.cover} alt=""/>
											<div className='pull-right' ref = 'body'>
												<h2>{item.title}</h2>
												<div className="time">{item.created_at.slice(0,10)}</div>
												<p className='content' dangerouslySetInnerHTML={{__html: item.body }}></p>
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
		);
	}
}
