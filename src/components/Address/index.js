import React, {Component} from 'react';
import './index.scss';
import { List} from 'antd-mobile';
import {Link} from 'react-router'

//图片
// import goods from 'static/goods.jpg'
import address from 'static/address.svg';

export default class Address extends Component {
	constructor(props){
		super(props)
		this.state={
			arrow: props.arrow || ''
		}
	}

	render() {
		const {arrow} =this.state
		const addresses =this.props.data
		return (
			<div className="Address">
				{
					addresses &&(
						<Link  onClick={()=>this.props.click && this.props.click()}>
							<List className="address" >
								<List.Item
									arrow={arrow}
									thumb={address}
									multipleLine
								>
									<div className='clearfix haveAddress'>
										<div className="pull-left">收货人：{addresses.address_name || addresses.name }</div>
										<div className="pull-right">{addresses.phone}</div>
									</div>
									<List.Item.Brief>收货地址：{addresses.full_address}</List.Item.Brief>
								</List.Item>
							</List>
						</Link>)
				}
			</div>
		);
	}
}
