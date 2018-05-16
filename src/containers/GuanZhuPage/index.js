import React from 'react'
import './index.scss'
import scnc_qrcode from 'static/scnc_qrcode.jpg'

export default function GuanZhuPage(){
	return (
		<div className='GuanZhuPage'>
			<img src={scnc_qrcode} alt=""/>
			<p>长按识别图中二维码或打开扫一扫</p>
		</div>
	)
}