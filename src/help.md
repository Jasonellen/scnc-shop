## 如果出现按需加载后 Link不能传递参数
#### react-router4 实现按需加载并利用withRouter传递props
```
React-router自带的withRouter可轻松解决:
import { withRouter } from 'react-router'
class Test extends Component {
    ...
    render(){
        const { match, location, history } = this.props
        ...
    }
}
export default withRouter(Test)
//export default withRouter(connect(...)(Test))//with redux
```


#### 弹窗
```
Alert('', '手机号码绑定成功！', [
	{ text: '取消', onPress: () => console.log('cancel') },
	{
		text: '确定',
		onPress: () => {
			this.props.handleModalClose()
		},
	},
])

Alert('', '手机号码绑定成功！', [
	// { text: '取消', onPress: () => console.log('cancel') }, //不要取消按钮
	{
		text: '轻点确定',
		onPress: () => {
			this.props.handleModalClose()
		},
	},
])

Modal.alert("", "密码修改成功")  //默认有确定按钮
```

> this.props.location.state 可以拿到 Link ={{pathname: '/', state: 'mine'}}中的state
IScroll 源码增加option {click:true} //启用浏览器默认点击click事件
