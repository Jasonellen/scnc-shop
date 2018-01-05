import React, {Component} from 'react';
import './index.scss'
import ReactIScroll  from 'react-iscroll'
export default class ZhuanLanDetail extends Component {
	constructor(){
		super()
		this.state={
			data:{}
		}
	}
	componentDidMount(){

		_fetch(url.article_detail(this.props.params.id))
			.then(data=>{
				this.setState({data})
			})
		setTimeout(()=>{
			this.setState({iscroll:IScroll})
		},1000)
	}

	render() {
		const {data} = this.state
		return (
			<div className="ZhuanLanDetail">
				<div className="warp">
					<ReactIScroll iScroll={this.state.iscroll || IScroll}>
						{
							data && (
								<div>
									<div className="blank"></div>
									<h1>{data.title}</h1>
									<div className="smallTitle">
										<span className="time">发布时间：{data.created_at && data.created_at.slice(0,10)}</span>
										<span className="time">来源：{data.source}</span>
									</div>
									<div className="body" dangerouslySetInnerHTML={{__html: data.body }}></div>
									<div className="blank"></div>
								</div>
							)
						}
					</ReactIScroll>
				</div>
			</div>
		);
	}
}
