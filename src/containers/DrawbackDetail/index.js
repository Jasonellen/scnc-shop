/**
 * Created by shaolong on 2017/5/24.
 */
import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router'
import {Modal, WhiteSpace, Toast} from 'antd-mobile';
import './index.scss';
import {connect} from 'react-redux';
import _Popover from '@/components/Popover'
import drawback from 'static/drawback.svg'
import drawbacksuccess from 'static/drawback.svg'


@connect(
	state => {
		return {
			state:state.drawBack,
			hasLogistic:state.applyBackLogistics.hasLogistic,
		}
	},
	null
)
export default class DrawbackDetail extends Component {
	constructor(){
		super()
		this.state={
			data:''
		}
	}
	componentDidMount(){

		setTimeout(()=>{
			this.scroll = new IScroll('.warp')
		},500)

		_fetch(url.get_refund,{id:this.props.params.refund_id})
			.then(data=>{
				if(data){
					this.setState({data})
				}
			})
	}

	componentDidUpdate(){
		setTimeout(()=>{
			this.scroll&&this.scroll.refresh()
		},0)

	}
	componentWillUnmount(){
		this.scroll = null
	}

	handleCancel = ()=>{
		Modal.alert('','撤销后不可再次发起，确定撤销本次退款申请么？',[
			{ text: '取消', onPress: () => console.log('cancel') },
			{
				text: '确认撤销',
				onPress: () => {
					_fetch(url.cancel_refund,{id:this.props.params.refund_id},'FORM')
						.then(data=>{
							if(data.success){
								Toast.info('退款申请已撤销',1)
								//退货列表
								browserHistory.push('/AfterSale')
							}
						})
				},
			}])
	}

	render() {
		const {data} = this.state
		const wuliu = this.props.hasLogistic ? '/ApplyBackLogistics' : '/ApplyBackLogisticsEdit'
		return (
			<div className="DrawbackDetail">
				<div className="warp">
					<div>
						{
							data.state == 0 || data.state ==1
							?
								<div className="top">
									<img src={drawback} alt=""/>
									<span>退款申请已发起，请等待商家处理</span>
								</div>
							: data.state == 2
								?
								<div className="top text">
									<h2>商家已同意退款，请将商品寄至</h2>
									<p>广州市繁育汉溪大道东383号万达广场B3座33层</p>
									<p>收件人徐小姐 联系电话：400-7160-777</p>
								</div>
								: data.state == 4 && (
									<div className="top">
										<img src={drawbacksuccess} alt=""/>
										<span>退款成功，请到我的钱包中查看</span>
									</div>
								)
						}
						<WhiteSpace />
						<div>
							<div className="title clearfix">
								退款信息
							</div>
							<ul className="body clearfix">
								<li>
									<div className="pull-left">
										<img src={data.item_url} alt=""/>
									</div>
									<div className="pull-left right">
										<div>{data.line_item}</div>
									</div>
								</li>
								<li className='clearfix'>
									<p>退款原因：<span>{data.refund_reason}</span></p>
									<p>退款金额：<span>￥{data.refund_value}</span></p>
									{
										data.state == 3 && <p>退款时间：<span>{data && data.refund_apply_at && data.refund_apply_at.slice(0,16).replace('T', ' ')}</span></p>
									}
									<p>申请时间：<span>{data && data.created_at && data.created_at.slice(0,16).replace('T', ' ')}</span></p>
									<p>退款说明：<span>{data.memo}</span></p>
								</li>
							</ul>
						</div>
						<Link
							to='/myOrder/1'
							className="back">返回我的订单</Link>
					</div>
				</div>
				<div className="bottom clearfix">
					<_Popover>
						<span>咨询</span>
					</_Popover>
					{
						data.state != 3 && (
							<div className="pull-right">
								{
									(data.state == 0 || data.state == 2) && <div className="cancel" onClick={this.handleCancel}>撤销申请</div>
								}
								{
									//商家处理中查看物流 否则修改申请
									data.state == 1
									? <Link className="ok"  to={{pathname:wuliu,state:data.id}}>查看物流</Link>
									: <div  className="ok"
													onClick={()=>browserHistory.push({
														pathname:'/Drawback',state:{
															name:data.line_item,
															img_url:data.item_url,
															price:data.item_price,
															quantity:data.item_quantity,
															refund_reason:data.refund_reason,
															refund_reason_id:data.refund_reason_id,
															refund_type:data.refund_type,
															order_state:data.order_state,
															order_no:data.order_no,
															item_id:data.item_property_id,
															memo:data.memo,
															refund_value:data.refund_value
														}
													})}>修改申请</div>
								}
							</div>)
					}

				</div>
			</div>
		)
	}
}
