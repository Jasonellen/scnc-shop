import React, {Component} from 'react';
import {List, WhiteSpace} from 'antd-mobile';
import {Link} from 'react-router'
import './index1.scss'

class PaySet extends Component {
	render() {
		return (
			<div className="PaySet">
				<WhiteSpace/>
					<div className="PaySetHome">
						<Link to='/MyWallet/PaySet/keyboard3'>
							<List className="home_list top">
								<List.Item
									arrow='horizontal'
									>修改支付密码</List.Item>
							</List>
						</Link>
						<WhiteSpace/>
						<Link to='/MyWallet/PaySet/PasswordSet'>
							<List className="home_list">
								<List.Item
									arrow='horizontal'
									>找回支付密码</List.Item>
							</List>
						</Link>
					</div>
			</div>
		);
	}
}

export default PaySet;
