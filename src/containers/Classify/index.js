/**
 * Created by shaolong on 2017/5/26.
 */
import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import {Link} from 'react-router'
import * as classifyAction from '@/actions/classify.js';
import Search from '@/components/Search';
import './index.scss';
import _search from 'static/search.svg'

@connect(
	state => {
		return {
			state:state.classify
		}
	},
	dispatch => bindActionCreators(classifyAction, dispatch)
)
export default class Classify extends Component {
	constructor() {
		super();
		this.state = {
			show:false
		}
	}
	componentDidMount(){
		_fetch(url.classify)
			.then((data)=>{
				this.props.setClassifyData(data.categories)
				this.handleTab(data.categories[0].sort)
			})
		setTimeout(()=>{
			this.scroll1 = new IScroll('.nav')
			this.scroll2 = new IScroll('.item-list')
		},500)
	}
	componentDidUpdate(){
		setTimeout(()=>{
			this.scroll1&&this.scroll1.refresh()
			this.scroll2&&this.scroll2.refresh()
		},0)
	}
	componentWillUnmount(){
		this.scroll1 = null
		this.scroll2 = null
	}

	handleTab = (text) => {
		_fetch(url.classify_detail(text))
			.then(data=>{
				this.props.setClassifyDetailData(data.products)
				this.props.changeShowTab(text)
			})
	}

	handleSearchCancle = ()=>{
		this.setState({show:false})
	}
	render() {
		const {showTab, categories, products} = this.props.state
		return (
			<div className="Classify">
				<Search ref={i=>this.Search = i}/>
				<div className='searchHeader' onClick={()=>this.Search.dispatchProps.changeShow(true)}>
					<div className='searchBar'>
						<img src={_search} alt=""/>
						搜索商品
					</div>
				</div>
				<div className="sort">
					<div className="nav">
						<div className='warp'>
						{
							categories.map((item, i)=>{
								return (
									<div key={i}
										className={`tag ${showTab == i+1 && 'active'}`}
										onClick={()=>this.handleTab(i+1)}>
										<div className="decor"></div>
										<div className="tag-note">{item.name}</div>
									</div>
								)
							})
						}
						</div>
					</div>
					<div className="item-list">
						<div className='warp'>
						{
							products.map(function(item,i){
								return (
									<Link key={i} className="item" to={`/GoodsDetail/${item.id}`}>
										<div className="image"><img src={item.image_url} height='100%' alt=""/></div>
										<p className="intro">{item.name}</p>
									</Link>
								)
							})
						}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
