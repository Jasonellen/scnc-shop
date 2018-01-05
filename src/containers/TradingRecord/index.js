import React, {Component} from 'react';
import './index.scss';
import ReactIScroll  from 'react-iscroll'
import Blank from '@/components/Blank'

export default class TradingRecord extends Component {
	constructor(props){
		super(props)
		this.state = {
			data: []
		}
	}
	componentDidMount(){
		_fetch(url.trade_logs)
			.then(data=>{
				this.setState({data})
			})
	}

	render() {
		const {data} = this.state
		return (
			<ReactIScroll iScroll={IScroll}>
			<div className="TradingRecord">
				{
					data.length>0
					?
					<ul>
						{
							data.map(function(item, i){
								let date = item.created_at.slice(0,16)
								let time = date.replace('T',' ')
								return(
									<li key={i} className='clearfix'>
										<div className="pull-left">
											<h3>
												{
													item.trade_type == 1 
													? '充值'
													: item.trade_type == 2
														? '提现'
														: '消费'
												}
												{
													item.trade_type == 2 && <small className='red'>({item.status == 0?'审核中':'审核通过，等待银行处理'})</small>
												}
											</h3>
											<p>{time}</p>
										</div>
										<span className="pull-right">{item.value}</span>
									</li>
								)
							})
						}
					</ul>
					: <Blank />
				}
			</div>
			</ReactIScroll>
		);
	}
}
