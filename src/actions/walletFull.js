import { createActions } from 'redux-actions';
export const {
	changePayChecked, changeMoney, changeCurrency,
	changeMoneyArr, changeIptActive, changeCheckMoney
} = createActions(
	'changePayChecked',
	'changeMoney',
	'changeCheckMoney',
	'changeCurrency',
	'changeMoneyArr',
	"changeIptActive",
)

export const handleMoney = (e) => (dispatch) => {
	let money = e.target.value
	//如果输入的第一个是空或者字母直接返回
	if(money && !Number(money) && Number(money) != 0) return;
	//设置最大限制10000
	if(money > 10000) return;
	//控制只能输入一个小数点
	if(money.indexOf('.') !== money.lastIndexOf('.')){
		money = money.slice(0, -1)
	}
	//保留一位小数
	if(money.indexOf('.') > 0){
		money = money.slice(0, money.indexOf('.') + 2)
	}
	//如果输入小数点后一位就去除前面多余的0
	if(money.indexOf('.') == money.length - 2){
		money = parseFloat(money)
	}
	dispatch(changeMoney(money))
}

export const handleMoneyBlur = () => (dispatch, getState) => {
	let money = getState().walletFull.money
	dispatch(changeCurrency('￥'))
	dispatch(changeIptActive(true))
	dispatch(changeCheckMoney(''))
	if(!money){
		dispatch(changeMoney(1))
	}
}
//用Click代替focus消除光标在数字前
export const handleMoneyFocus = () => (dispatch, getState) => {
	dispatch(changeCurrency(''))
	dispatch(changeIptActive(false))
	let data = getState().walletFull.moneyArr
	data.map(function(item){
		item.active = false
	})
}

export const handleMoneyArr = (index) => (dispatch, getState) => {
	let data = getState().walletFull.moneyArr
	let money = ''
	data.map(function(item, i){
		if(i == index){
			item.active = true
			money = item.price
		}else{
			item.active = false
		}
	})
	dispatch(changeMoneyArr(data))
	dispatch(changeCurrency(''))
	dispatch(changeMoney(''))
	dispatch(changeCheckMoney(money))
	dispatch(changeIptActive(false))
}
