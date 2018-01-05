import React, {Component} from 'react';
import './index.scss'

//图片
import keyboardDel from 'static/keyboardDel.svg'

class Keyboard extends Component {
	constructor(props){
		super(props)
		this.state = {
			title: props.title || '请输入支付密码',
			err: props.err || '',
			password: [
				{text:'', point: true, dot: false},
				{text:'', point: false, dot: false},
				{text:'', point: false, dot: false},
				{text:'', point: false, dot: false},
				{text:'', point: false, dot: false},
				{text:'', point: false, dot: false},
			],
			key_number:[
				1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0
			]
		}
	}
	componentWillReceiveProps(next){
		this.setState({
			err:next.err
		})
	}
	handleClick(num){
		if(num == 9) return;
		let password = this.state.password
		let length = password.length
		for(let i = 0; i < length; i++){
			if(password[i].point){
				password[i].text = num + 1
				password[i].point = false
				password[i].dot = true
				if(i == 5){
					let number = password.reduce((prev, next)=>{
						return prev + next.text
					}, '')
					this.props.onChange && this.props.onChange(number) //输出的密码
					//重置
					password.map((item, index)=>{
						item.text = ''
						item.point = false
						item.dot = false
						if(index == 0){
							item.point = true
						}
					})
				}else{
					password[i + 1].point = true
				}
				this.setState({})
				break;
			}
		}
	}
	Del = ()=>{
		let password = this.state.password
		let length = password.length
		for(let i = 0; i < length; i++){
			if(password[i].point && (i !== 0)){
				password[i].text = ''
				password[i].point = false
				password[i - 1].point = true
				password[i - 1].dot = false
				this.setState({})
				break;
			}
		}
	}
	render() {
		const {password, key_number, title, err} = this.state

		return (
			<div className="_Keyboard">
				<div className='custom'>
					<div className='title'>{title}</div>
					<ul className='password clearfix'>
						{
							password.map((item, i)=>{
								return (
									<li key={i} className={item.dot ? 'dot' : ''}></li>
								)
							})
						}
					</ul>
					<div className="err">{err}</div>
				</div>
				<div className="key-bord">
					<p className='key-title'>安全输入键盘</p>
					<ul className='key clearfix'>
						{
							key_number.map((item, i)=>{
								return (
									<li
										key={i}
										onClick={()=>this.handleClick(i)}
									>{item}</li>
								)
							})
						}
						<li onClick={()=>this.Del()}><img src={keyboardDel} alt=""/></li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Keyboard;
