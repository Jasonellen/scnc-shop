import React, {Component} from 'react';
import './index.scss'
import { Link} from 'react-router'
import UpPull from '@/components/UpPull'

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

		setTimeout(()=>{
			this.scroll = new IScroll('.ZhuanLan',{
				probeType: 2
			})
			this.setState({
				iscroll:this.scroll
			})
		},500)

		this.getArticles()
			.then(data=>{
				this.setState({data})
			})
	}

	handleLoading = ()=>{
		this.setState({isLoading:true, page:this.state.page+1}, ()=>{
			this.getArticles()
				.then(data=>{
					if(data.length>0){
						this.setState({data:this.state.data.concat(data), isLoading:false})
					}else{
						this.setState({hasMore:false, isLoading:false})
					}
				})
		})
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
		const {data, isLoading, hasMore, iscroll} =this.state
		return (
			<div className="ZhuanLan">
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
					<UpPull
						iscroll = { iscroll }
						hasMore ={hasMore}
						isLoading = {isLoading}
						onLoading = {this.handleLoading}
					/>
				</ul>
			</div>
		);
	}
}
