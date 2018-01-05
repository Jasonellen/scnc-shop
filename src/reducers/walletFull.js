import { handleActions } from 'redux-actions';

let initialState = {
	payChecked:2,
	money:'',
	checkMoney:'1000',
	currency:'',
	moneyArr:[
		{price:'1000', active:true},
		{price:'500', active:false},
		{price:'300', active:false},
		{price:'100', active:false},
		{price:'50', active:false},
		{price:'20', active:false},
	],
	iptActive:false,
}
const walletFull = handleActions({
	changePayChecked: (state, action) => ({
		...state,
		payChecked: action.payload
	}),
	changeMoney: (state, action) => ({
		...state,
		money: action.payload
	}),
	changeCheckMoney: (state, action) => ({
		...state,
		checkMoney: action.payload
	}),
	changeCurrency: (state, action) => ({
		...state,
		currency: action.payload
	}),
	changeIptActive:(state, action) => ({
		...state,
		iptActive: action.payload
	}),
	changeMoneyArr: (state, action) => ({
		...state,
		moneyArr: action.payload
	})
}, initialState);


export default walletFull;
