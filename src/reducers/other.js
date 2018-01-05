import { handleActions } from 'redux-actions';

let initialState = {
	bank_cards:[], //我的银行卡列表
	user:'',  //用户信息
	balance:'', //余额
	QRCode:'', //二维码
	chatInfo:{}, //聊天室信息
	expertChatInfo:{}, //聊天室信息
}
const other = handleActions({

	changeBankCards: (state, action) => ({
		...state,
		bank_cards: action.payload
	}),
	changeUser: (state, action) => ({
		...state,
		user: action.payload
	}),
	changeBalance: (state, action) => ({
		...state,
		balance: action.payload
	}),
	changeCode: (state, action) => ({
		...state,
		QRCode: action.payload
	}),
	changeChatInfo: (state, action) => ({
		...state,
		chatInfo: action.payload
	}),
	changeExpertChatInfo: (state, action) => ({
		...state,
		expertChatInfo: action.payload
	})

}, initialState);


export default other;
