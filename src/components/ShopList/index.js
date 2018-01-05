/**
 * Created by shaolong on 2017/5/24.
 */
import React, {Component} from 'react';
import {Stepper} from 'antd-mobile';
import {Link} from 'react-router'

import './index.scss';

export default class ShopList extends Component {

	constructor(props){
		super(props)
		this.state = {
			data:props.data,  //①   这里需要获取初次的值
		}
	}
	//使得父组件状态改变可以重新渲染子组件数据
	componentWillReceiveProps(nextProps) {
		this.setState({data:nextProps.data})
	}  //②

	//商品数量
	handleChangeCount = (quantity) => {
		this.props.onCount(quantity);
	}

	handleCheck = (e)=>{
		this.props.onCheck(e.target.checked)
	}
	render() {
		const {data} = this.state // ③
		return (
			<div className="ShopList">
				<div className="list">
					<div className="list-item">
						<div className="checkbox">
							<input type="checkbox"
								checked={data.checked}
								onChange={this.handleCheck}/>
							<span className="sel"></span>
						</div>

						<div className="img-wrap">
							<Link to='/GoodsDetail/1'>
								<div className="image"><img src={data.product_image}  alt=""/></div>
							</Link>
						</div>

						<div className="right">
							<Link to='/GoodsDetail/1'>
								<p className="name">{data.product_name}</p>
							</Link>
							<div className="down">
								<div className="price">¥{data.product_property.price}</div>
								<div className="counts">
									<Stepper
										style={{width: '100%', minWidth: '2rem'}}
										showNumber
										max={data.product_property.quantity}
										min={1}
										value={data.quantity}
										onChange={this.handleChangeCount}
									/>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		)
	}
}
