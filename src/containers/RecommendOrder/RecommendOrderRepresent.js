import React, {Component} from 'react';
import './index.scss';
import { Tabs } from 'antd-mobile';
import OrderList from './OrderList'

export default class RecommendOrderRepresent extends Component {

	componentDidMount(){
		//标记全部为已读
		_fetch(url.read_order_msg)
	}

	render() {

		return (
			<div className="RecommendOrder">
				<Tabs
					defaultActiveKey='1'
					swipeable={false}
					>
          <Tabs.TabPane tab="进行中" key="1">
						<OrderList order_status={1} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="已完成" key="2">
						<OrderList order_status={0} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="未完成" key="3">
						<OrderList order_status={2} />
          </Tabs.TabPane>
        </Tabs>
			</div>
		);
	}
}

