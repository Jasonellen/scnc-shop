/**
 * Created by shaolong on 2017/5/24.
 */
import React, {Component} from 'react';
import {WhiteSpace} from 'antd-mobile';
import './index.scss';
import Blank from '@/components/Blank'
import ReactIScroll  from 'react-iscroll'

export default class DrawbackDetail extends Component {

	render() {

		const {name,ship_no,list ,logo,status} = this.props
		const obj = {
			"-1": "待查询",
			"0": "查询异常",
			"1": "暂无记录",
			"2": "在途中",
			"3": "派送中",
			"4": "已签收",
			"5": "用户拒签",
			"6": "疑难件",
			"7": "无效单",
			"8": "超时单",
			"9": "签收失败",
			"10": "退回",
		}
		return (
			<div className="Logistics">
				<div className="warp">
					<ReactIScroll iScroll={IScroll}>
					<div className="pd">
						{
							list && list.length > 0
							? <div>
									<div className="top clearfix">
										<img  className='pull-left' src={logo} alt=""/>
										<div className="pull-left">
											<div>{name}</div>
											<p>运单编号：{ship_no}</p>
											<p>物流状态：{obj[status]}</p>
										</div>
									</div>
									<WhiteSpace />
									<div>
										<ul className="body clearfix">
										{
											list.map(function(item,i){
												return <li key={i}>
																<div className={(i == 0) && "active"}>
																	<p>{item.context}</p>
																	<p>{item.time}</p>
																</div>
															</li>
											})
										}
										</ul>
									</div>
								</div>
							: <Blank />
						}
					</div>
					</ReactIScroll>
				</div>
			</div>
		)
	}
}
