import React, {Component} from 'react';
import './index.scss';
import { Link } from 'react-router'
import ReactIScroll  from 'react-iscroll'
import Address from '@/components/Address'
import successsvg from 'static/walletPaySuccess.svg'

export default class DuiHuanPage extends Component {
	state={
		data:'',
		detail_data:{}
	}
	componentDidMount(){
		this.getDetailData()
		this.getAddress()
	}

	getDetailData = ()=>{
		_fetch(url.exchange_goods_detail,{id:this.props.params.id})
			.then(data=>{
				this.setState({
					detail_data:data
				})
			})
	}
	getAddress = ()=>{
		_fetch(url.addresses)
			.then(data=>{
				let _data;
				if(data.addresses.length>0){
					_data = data.addresses.find(function(item){
						return item.status == 1
					})
					this.setState({data:_data})
				}
			})
	}

	render() {
		const { data, detail_data } = this.state
		return (
			<div className="DuiHuanPage">
				<div className="wrap">
					<ReactIScroll iScroll={IScroll}>
						<div>
							<div className="top_success">
								<img src={successsvg} alt=""/>
								<span>恭喜兑换成功</span>
								<p>关注“兑换记录”，掌握订单最新状态~</p>
							</div>
							<div className="goods">
								<div className='clearfix left'>
									<span className='pull-left'>
										<img src={detail_data.cover} alt="" className='pull-left'/>
										<div className="pull-right clearfix">
												<p>{detail_data.good_name}</p>
												<span>{detail_data.points}积分</span>
										</div>
									</span>
								</div>
							</div>
							<Address
								data={data}
							/>
							<div className="constr">
								<div className="top">详情说明</div>
								<ul className="content">
									<li>
										<div>商品简介：</div>
										<p>{detail_data.goods_detail}</p>
									</li>
									<li>
										<div>兑换流程：</div>
										<p>{detail_data.exchange_process}</p>
									</li>
									<li>
										<div>注意事项：</div>
										<p>{detail_data.exchange_comment}</p>
									</li>
								</ul>
								<div className="code">订单编号：{this.props.params.order}</div>
							</div>
						</div>
					</ReactIScroll>
				</div>
				<div className="footer clearfix">
					<Link to='/'><span className='pull-left'>首页</span></Link>
					<Link to='/ExchangeRecord'><span className="pull-right duihuan">兑换记录</span></Link>
					<Link to='/IntegralMall'><span className="pull-right">返回积分商城</span></Link>
				</div>
			</div>
		);
	}
}
