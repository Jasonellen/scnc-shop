import React, {Component} from 'react';
import {List, WhiteSpace} from 'antd-mobile';
import {Link} from 'react-router'
import './index.scss'

//图片
import jiebang from 'static/jiebang.png'

class ManageAccount extends Component {
	render() {
		return (
			<div className="manageAccount">
				<WhiteSpace/>
					<div className="manageAccountHome">
						<Link to='/changeBind'>
							<List className="home_list top">
								<List.Item
									thumb={jiebang}
									arrow='horizontal'
									>更改绑定</List.Item>
							</List>
						</Link>
						<WhiteSpace/>
					</div>
					<Link to='/OldAccount' className='old'>我是老用户</Link>
			</div>
		);
	}
}

export default ManageAccount
