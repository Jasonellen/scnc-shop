
import React, {Component} from 'react';
import './index.scss';
import Blank from '@/components/Blank'
import no_points from 'static/no_points.svg'
import ReactIScroll  from 'react-iscroll'
import rank1  from 'static/rank1.svg'
import rank2  from 'static/rank2.svg'
import rank3  from 'static/rank3.svg'

export default class ZhuLiRank extends Component {
	state={
		data:[]
	}
	componentDidMount() {
		_fetch(url.users_invite_ranking)
			.then(data=>{
				if(data.success){
					this.setState({
						data:data.data
					})
				}
			})
	}
	render() {
		const { data } = this.state
		const imgindex={
			0:rank1,
			1:rank2,
			2:rank3,
		}
		return (
			<ReactIScroll iScroll={IScroll}>
			<div className="ZhuLiRank">
			{
				data.length>0
				?
					<ul className="rank_list">
					{
						data.map(function(item,i){
							if(i<3){
								return (
									<li className='clearfix'>
										<div className="pull-left _left">
											<img src={imgindex[i]} alt=""/>
										</div>
										<div className="middle pull-left clearfix">
											<img src={item.headimageurl} alt="" className='pull-left'/>
											<div className="pull-left">
												<p>{item.name}</p>
												<p><small>已获得助力积分</small></p>
											</div>
										</div>
										<div className="pull-right _right">{item.point}</div>
									</li>
								)
							}else{
								return (
									<li className='clearfix'>
										<div className="pull-left _left">{i+1}</div>
										<div className="middle pull-left clearfix">
											<img src={item.headimageurl} alt="" className='pull-left'/>
											<div className="pull-left">
												<p>{item.name}</p>
												<p><small>已获得助力积分</small></p>
											</div>
										</div>
										<div className="pull-right _right">{item.point}</div>
									</li>
								)
							}
						})
					}
					</ul>
				:
					<Blank img={no_points} text="暂无排行榜~" imgWidth="2.67rem"/>
			}
			</div>
			</ReactIScroll>
		);
	}
}
