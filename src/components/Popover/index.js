import React, {Component} from 'react';
import { Popover, Icon} from 'antd-mobile';
import { Link} from 'react-router'
const Item = Popover.Item
import './index.scss'

export default  class _Popover extends Component {
	constructor(props){
		super(props)
		this.state = {
			visible:false
		}
	}
	//模太框toggle
	handleVisibleChange = (visible) => {
		this.setState({
			visible,
		});
	};

	render() {
		const {visible} =this.state
		return (
			<div className="_Popover">
				<div className={visible ? "my_modal active" : "my_modal"}></div>
				<Popover
					style={{height:'100%'}}
						visible={visible}
						overlay={[
							(<div key='1'>
								<a href="http://wpa.qq.com/msgrd?v=1&uin=3385866853&site=qq&menu=yes&from=message&isappinstalled=0">
									<Item key="1" value="QQ1" icon={<Icon type={require('static/icon/qq.svg')} size="sm" />}>QQ客服1</Item>
								</a>
							</div>),
							(<div key='2'>
								<a href="http://wpa.qq.com/msgrd?v=1&uin=2157943549&site=qq&menu=yes&from=message&isappinstalled=0">
									<Item key="2" value="QQ1" icon={<Icon type={require('static/icon/qq.svg')} size="sm" />}>QQ客服2</Item>
								</a>
							</div>),
							(<div key="3">
								<a href="tel:4007160777"><Item key="3" value="400-7160-777" icon={<Icon type={require('static/icon/tel.svg')} size="sm" />}>电话咨询</Item></a>
							</div>),
							(<Item key="4" value="doctor"
								icon={<Icon type={require('static/icon/doctor.svg')} size="sm" />}>
								<Link to='/goChat'><span style={{marginRight: 5}}>专家咨询</span></Link>
							</Item>),
						]}
						onVisibleChange={this.handleVisibleChange}
						onSelect={()=>{}}
						placement='topLeft'
						popupAlign={{
							overflow: {adjustY: 0, adjustX: 0},
							offset: [15, -15]
						}}
					>
					{this.props.children}
				</Popover>
			</div>
		);
	}
}
