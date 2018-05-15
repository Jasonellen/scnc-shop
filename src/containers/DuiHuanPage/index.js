import React, {Component} from 'react';
import {SwipeAction, Toast, List, Modal} from 'antd-mobile'
import './index.scss';
import { Link, browserHistory } from 'react-router'
import ReactIScroll  from 'react-iscroll'
import Blank from '@/components/Blank'
import Address from '@/components/Address'
import successsvg from 'static/walletPaySuccess.svg'

export default class DuiHuanPage extends Component {
	state={
		data:''
	}
	componentDidMount(){
		_fetch(url.addresses)
			.then(data=>{
				let _data;
				if(data.addresses.length>0){
					_data = data.addresses.filter(function(item){
						return item.status == 1
					})
					this.setState({data:_data[0]})
				}

			})
	}

	render() {
		const { data } = this.state
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
										<img src='http://img0.imgtn.bdimg.com/it/u=2730689356,2513750244&fm=27&gp=0.jpg' alt="" className='pull-left'/>
										<div className="pull-right clearfix">
												<p>维生素D钙粉(1~4岁）</p>
												<span>3600积分</span>
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
										<p>啊飒飒大师局领导看就按了的按实际偶家鸡鸡都琵琶是都安静奇偶埃及活动哈搜索到啊是大家搜到阿萨的</p>
									</li>
									<li>
										<div>兑换流程：</div>
										<p>啊飒飒大师局领导看就按了的按实际偶家鸡鸡都琵琶是都安静奇偶埃及活动哈搜索到啊是大家搜到阿萨的</p>
									</li>
									<li>
										<div>注意事项：</div>
										<p>啊飒飒大师局领导看就按了的按实际偶家鸡鸡都琵琶是都安静奇偶埃及活动哈搜索到啊是大家搜到阿萨的</p>
									</li>
								</ul>
								<div className="code">订单编号：123718927389791273</div>
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
