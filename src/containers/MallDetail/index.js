import React, {Component} from 'react';
import {SwipeAction, Toast, List, Modal} from 'antd-mobile'
import './index.scss';
import { Link, browserHistory } from 'react-router'
import ReactIScroll  from 'react-iscroll'
import {connect} from 'react-redux';
import Blank from '@/components/Blank'
import Address from '@/components/Address'

@connect(
	state => {
		return {
			state: state.other.user,
		}
	},
	null
)
export default class MallDetail extends Component {
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

	handleSubmit = ()=>{
		Modal.alert('','添加收货地址后才能添加该商品哦~！', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{
				text: '现在填写',
				onPress: () => {
					browserHistory.push('/addAddress')
				},
			},
		],'ios')

		// Modal.alert('','确定使用3600积分兑换？', [
		// 	{ text: '取消', onPress: () => console.log('cancel') },
		// 	{
		// 		text: '确定',
		// 		onPress: () => {
		// 			browserHistory.push('/duihuanpage')
		// 		},
		// 	},
		// ],'ios')
	}

	render() {
		const { data } = this.state
		const { point } = this.props.state
		return (
			<div className="MallDetail">
				<div className="wrap">
					<ReactIScroll iScroll={IScroll}>
						<div>
							<div className="banner">
								<img src="http://img5.imgtn.bdimg.com/it/u=1593267945,1462874642&fm=27&gp=0.jpg" alt=""/>
							</div>
							<div className="goods">
								<h1>维生素D钙粉(1~4岁)</h1>
								<div className='p clearfix'>
									<div className="pull-left">3600<span>积分</span><i>&yen;2900</i></div>
									<div className="pull-right">运费：包邮</div>
								</div>
							</div>
							{
								data
								?
									<Address
										arrow="horizontal"
										data={data}
										click={()=>browserHistory.push('/ManageAddressCanBack')}
									/>
								:
									<Link onClick={()=>browserHistory.push('/addAddress')}>
										<List.Item arrow="horizontal"><span className='no_address'>您还未填写收货地址，马上填写</span></List.Item>
									</Link>
							}
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
					<div className="footer">
						<div onClick={this.handleSubmit}>立即兑换</div>
					</div>
				</div>
			</div>
		);
	}
}
