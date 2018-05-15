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
import ReactIScroll  from 'react-iscroll'

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
				if(this.props.state.showTab){
					this.handleTab(this.props.state.showTab)
				}else{
					this.handleTab(data.categories[0].sort)
				}
			})
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
						<ReactIScroll 
							iScroll={IScroll} 
						>
							<div className='warp'>
							{
								categories.map((item, i)=>{
									return (
										<div key={i}
											className={`tag ${showTab == item.sort && 'active'}`}
											onClick={()=>this.handleTab(item.sort)}>
											<div className="decor"></div>
											<div className="tag-note">{item.name}</div>
										</div>
									)
								})
							}
							</div>
						</ReactIScroll>
					</div>
					<div className="item-list">
						<ReactIScroll 
							iScroll={IScroll} 
						>
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
						</ReactIScroll>
					</div>
				</div>
			</div>
		);
	}
}
