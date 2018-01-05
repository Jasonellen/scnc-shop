/**
 * Created by shaolong on 2017/5/26.
 */
import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as _search from '@/actions/search.js';
import {browserHistory} from 'react-router'
import './index.scss';

class Search extends Component {
	componentDidMount() {
		_fetch(url.get_hot_keyword)
			.then(data=>{
				if(data && data.length>0){
					this.props.changeHotData(data)
				}
			})
	}
	componentDidUpdate(){  //这个好用
		this.ipt.focus()
	}
	handleToDetail = (id, value)=>{
		let {historyData} = this.props.state
		historyData.unshift(value)
		historyData.length = historyData.length > 5 ? 5 : historyData.length
		this.props.changeHistoryData(historyData)
		localStorage.setItem('historyData',JSON.stringify(historyData))
		this.props.handleCancel()
		browserHistory.push(`/GoodsDetail/${id}`)
	}
	render() {
		const {
			show, value, searchResultPage,
			hotData, productData,historyData
		} = this.props.state;
		return (
			<div className={show ? 'searchBox' : 'searchBox none'}>
				<div className='top-bar'>
					<div className="search">
						<div className="search-wrap">
							<input  type="text"
								value={value}
								ref={i=>this.ipt = i}
								className="keywords"
								placeholder="搜索商品"
								onChange={(e)=>this.props.handleChange(e.target.value.trim())}
							/>
							<div className="cancel-wrap" onClick={this.props.clearValue}></div>
						</div>
						<div className= "cancel"
							onClick={this.props.handleCancel}>
								取消
						</div>
					</div>

					<div className="result">
						{
							searchResultPage
								?
								<div className="found">
									<div className="results">
										{
											productData.length > 0
												?
												productData.map((item, i)=>{
													return (
														<div className="item" key={i} onClick={()=>this.handleToDetail(item.id, item.name)}>
															<div className="item-name">{item.name}</div>
															<div className="go-icon"></div>
														</div>
													)
												})
												:
												<div className="noresult">暂无搜索结果</div>
										}
									</div>
								</div>
								:
								<div>
									<div className="hot-search">
										{
											hotData.length > 0 && (
												<div>
													<h3>热门搜索</h3>
													<div className="hot">
														{
															hotData.map((item, i)=>{
																return <div key={i} className="hot-tag" onClick={()=>this.props.handleHot(item.keyword)}>{item.keyword}</div>
															})
														}
													</div>
												</div>)
										}
									</div>
									<div className="record">
										<div className="record-list">
											{
												historyData.length > 0 && historyData.map((item, i)=>{
													return(
														item && <div className="record-item" key={i}>
															<div className="record-keywords" onClick={()=>this.props.handleHot(item)}>{item}</div>
															<div className="delete" onClick={()=>this.props.deleteHistory(i)}></div>
														</div>
													)
												})
											}
										</div>
										{
											historyData && historyData.length > 0 && (
												<div className="delete-all">
													<div className="delete-all-op" onClick={()=>this.props.deleteAllHistory()}>清除搜索记录</div>
												</div>
											)
										}
									</div>
								</div>
						}
					</div>
				</div>
				<div className="mask"
					onClick={this.props.handleCancel}>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		state:state._search
	}
};
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(_search, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
