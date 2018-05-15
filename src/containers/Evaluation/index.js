import React, {Component} from 'react';
import Score from '@/components/Score'
import './index.scss'
import ReactIScroll  from 'react-iscroll'
import { PhotoSwipeGallery }  from 'jasonellen-reactphotoswipe';

export default class Evaluation extends Component {
	constructor(props){
		super(props)
		this.state = {
			score:0,
			show:false,
			items:[]
		}
	}
	componentDidMount() {
		_fetch(url.get_product_comments,{product_id:this.props.params.id})
			.then(data=>{
				if(data){
					this.setState({
						score:data.score,
						items:data.comment
					})
				}
			})
	}

	render() {
		const { items, score } = this.state
		return (
			<div className="Evaluation">

			<ReactIScroll iScroll={IScroll}>
			<div>
				<div className="head">
					<span>商品评分：</span>
					<Score score={score || '0'} width = {40/75+"rem"} margin={0.1333334+'rem'}/>
					<strong>{score || 0}</strong>
				</div>
				<div className="line">共{items.length}条商品评价</div>
				<div className="wrap">
					<ul>
						{
							items.length>0 && items.map((item, i)=>{
								return (
									<li className='clearfix' key={i}>
										<img src={item.user_head_url} alt="" className="pull-left" />
										<div className="pull-right content">
											<div className='title'>
												<span className='box'>
													<span className='name'>{(!item.anonymous && item.user_name) || '匿名用户'}</span>
													<i>&nbsp;&nbsp;{item.created_at && item.created_at.slice(0,10)}</i>
												</span>
												<Score score={score || '0'} width = {30/75+"rem"} margin={0.06666667+'rem'}/>
											</div>
											<p>{item.content || '此用户没有填写评价'}</p>
											{
												item.pictures.length>0 && item.pictures.length>0 && item.pictures[0].picture.length>0 && item.pictures[0].picture.map((item)=>{
													item.src = item.url
												})
											}
											{
												item.pictures.length>0 && <PhotoSwipeGallery
													items={item.pictures[0].picture}
													thumbnailContent={this.getThumbnailContent}
												/>
											}

										</div>
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
			</ReactIScroll>
			</div>
		);
	}
}

