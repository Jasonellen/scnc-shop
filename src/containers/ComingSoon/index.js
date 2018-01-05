/**
 * Created by mds on 17/10/27.
 */
import React from 'react';
import img from 'static/comingSoon.png'
import './index.scss'
export default function ComingSoon(){
	return (
		<div className="comingSoon">
			<img src={img} alt="" />
			<p>敬请期待</p>
		</div>
	)
}