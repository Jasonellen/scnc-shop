/**
 * Created by mds on 17/10/27.
 */
/**
 * Created by mds on 17/10/27.
 */
import React from 'react';
import {WhiteSpace} from 'antd-mobile';
import {Link} from 'react-router'

export default function DPJ(props){
	const item = props.data
	return (
		<div>
			<WhiteSpace />
			<div className="title clearfix">
				订单号：{item.order_no} <span className='pull-right'>待评价</span>
			</div>
			<ul className="body clearfix">
				{
					item.order_items.length>0 && item.order_items.map((item2,index)=>{
						return(
							<li key={index}>
								<Link to={{pathname:`/OrderDetail/${item.order_no}`}}>
									<div className="pull-left">
										<img src={item2.image_url} alt=""/>
									</div>
									<div className="pull-left right">
										<div>{item2.name}</div>
										<p>￥{item2.price}<span>x{item2.quantity}</span></p>
									</div>
									<p className='backMoney'>
										{
											item2.state == 0
												? ''
												: item2.state == 1
												? '退款申请中'
												: item2.state == 2
												? '商家处理中'
												: item2.state == -1
												? '无法退款'
												: '退款完成'
										}
									</p>
								</Link>
							</li>
						)
					})
				}
			</ul>
			<div className="bottom clearfix">
				合计：<span>￥{item.amount}</span>
				<div className="pull-right">
					<div className="cancel" onClick={()=>props.handleCheckLogistic(item.order_no,item.shipping.code,item.shipping_no,item.shipping.name,item.shipping.logo)}>查看物流</div>
					<Link to={{pathname:'/Evaluate', query:{list:JSON.stringify(item.order_items),order_no:item.order_no}}} className="ok">立即评价</Link>
				</div>
			</div>
		</div>
	)
}
