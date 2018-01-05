/**
 * Created by mds on 17/10/27.
 */
import React from 'react';
import {WhiteSpace} from 'antd-mobile';
import {Link} from 'react-router'

export default function DFK(props){
	const item = props.data
	return (
		<div>
			<WhiteSpace />
			<div className="title clearfix">
				订单号：{item.order_no}<span className='pull-right'>待付款</span>
			</div>
			<ul className="body clearfix">
				{
					item.order_items.length>0 && item.order_items.map((item2,index)=>{
						return(
							<li key={index}>
								<Link to={`/OrderDetail/${item.order_no}`}>
									<div className="pull-left">
										<img src={item2.image_url} alt=""/>
									</div>
									<div className="pull-left right">
										<div>{item2.name}</div>
										<p>￥{item2.price}<span>x{item2.quantity}</span></p>
									</div>
								</Link>
							</li>
						)
					})
				}
			</ul>
			<div className="bottom clearfix">
				共{item.order_items.length}件 应付总额：<span>￥{item.amount}</span>
				<div className="pull-right">
					<div className="cancel" onClick={()=>props.onClick(item.order_no)}>取消订单</div>
					<Link to={`/orderBuy/${item.order_no}`} className="ok">
						立即付款
					</Link>
				</div>
			</div>
		</div>
	)
}
