import React, {Component} from 'react';
import './index.scss';
import {Card} from 'antd-mobile';
import {connect} from 'react-redux';

@connect(
	state => {
		return {
			QRCode:state.other.QRCode,
			user:state.other.user
		}
	}
)
export default class MyQRCode extends Component {

	render() {
		const {QRCode, user} = this.props
		return (
			<div className="MyQRCode">
				<Card>
					<Card.Header
						title={user.name}
						thumb={user.headimageurl || "/static/morentouxiang.png"}
					/>
					<Card.Body>
						<div>
							<img src={QRCode} alt=""/>
							<p>请用微信扫一扫二维码</p>
						</div>
					</Card.Body>
				</Card>
			</div>
		);
	}
}
