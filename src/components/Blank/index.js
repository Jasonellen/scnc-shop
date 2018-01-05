/**
 * Created by mds on 17/10/27.
 */
import React from 'react';
import orderBlank from 'static/orderBlank.svg'
import './index.scss'

export default function Blank(props){
	return (
		<div className="blank">
			<img src={props.img || orderBlank} alt="" style={{width:props.imgWidth}}/>
			<p>{props.text || '您还没有相关订单哦~'}</p>
		</div>
	)
}