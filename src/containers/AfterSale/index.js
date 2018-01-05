
import React, {Component} from 'react';
import { WhiteSpace} from 'antd-mobile';
import {Link} from 'react-router'
import './index.scss'
import ReactIScroll  from 'react-iscroll'
import Blank from '@/components/Blank'
import backmoney from 'static/backmoney.svg'
import backmoneyandgoods from 'static/backmoneyandgoods.svg'

export default  class AfterSale extends Component {
	constructor(props){
		super(props)
		this.state = {
			data:[]
		}
	}

	componentDidMount(){
		_fetch(url.get_my_refund)
			.then(data=>{
				if(data && data.length>0){
					this.setState({data})
				}
			})
	}

	render() {
		const {data} = this.state
		return (

			<div className="AfterSale">
				<ReactIScroll iScroll={IScroll}>
					<div>
				{
					data.length>0
					? data.map((item,i)=>{
						return(
							<div key={i}>
								<WhiteSpace />
								<div className="title clearfix">
									{
										data.refund_type == 0
										? <span className='head'><img src={backmoney} alt=""/>仅退款</span>
										: <span className='head'><img src={backmoneyandgoods} alt=""/>退货退款</span>
									}
									<span className='pull-right'>
										{
											item.state == -1
											? '退款关闭'
											: item.state == 3
												? '退款完成'
												: item.state == 1
													? '等待商家处理'
													: item.state == 2
														? '商家处理中'
														: item.state == 4
															? '商家拒绝退款'
															: ''
										}
									</span>
								</div>
								<ul className="body clearfix">
									<li>
										<Link to={`/OrderDetail/${item.order_no}`}>
											<div className="pull-left">
												<img src={item.item_url} alt=""/>
											</div>
											<div className="pull-left right">
												<div>{item.line_item}</div>
												<p>￥{item.item_price}<span>x{item.item_quantity}</span></p>
											</div>
										</Link>
									</li>
								</ul>
								<div className="bottom clearfix">
									退款金额：<span>￥{item.refund_value}</span>
									<div className="pull-right">
										<Link className="ok" to={`/DrawbackDetail/${item.item_property_id}`}>查看详情</Link>
									</div>
								</div>
							</div>
						)
					})
					: <Blank />
				}
				</div>
			</ReactIScroll>
			</div>

		);
	}
}







