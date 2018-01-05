import { handleActions } from 'redux-actions';

let initialState = {
	addresses:{}, //省市区
	shippings:[], //源快递方式
	sendWayData:[], //快递方式picker
	shipping_types:[],  //源配送类型
	sendTimeData:[],  //配送类型picker
	sendWay:'',
	shipping_id:'',
	sendTime:'',
	shipping_type_id:'',
	memo:'',
	amount:0,
	pay_way_id:2,  //支付类型  1 支付宝  2微信
	paySuccess:false, //支付结果 成功或失败
	config:{},  //支付配置参数
	walletPay:''  //是否钱包支付
}

const cart = handleActions({
	setSendWayData: (state, action) => ({
		...state,
		sendWayData: action.payload,
	}),
	changeSendWay: (state, action) => ({
		...state,
		sendWay: action.payload.name,
		shipping_id: action.payload.id,
	}),
	setSendTimeData: (state, action) => ({
		...state,
		sendTimeData: action.payload,
	}),
	changeSendTime: (state, action) => ({
		...state,
		sendTime: action.payload.name,
		shipping_type_id:action.payload.id,
	}),
	setAddress: (state, action) => ({
		...state,
		addresses: action.payload,
	}),
	setShippings: (state, action) => ({
		...state,
		shippings: action.payload,
	}),
	setShippingTypes: (state, action) => ({
		...state,
		shipping_types: action.payload,
	}),
	changeMemo: (state, action) => ({
		...state,
		memo: action.payload,
	}),
	changePrice: (state, action) => ({
		...state,
		amount: action.payload,
	}),
	changePayType: (state, action) => ({
		...state,
		pay_way_id: action.payload,
	}),
	changePaySuccess: (state, action) => ({
		...state,
		paySuccess: action.payload,
	}),
	changeConfig: (state, action) => ({
		...state,
		config: action.payload,
	}),
	changeWalletPay: (state, action) => ({
		...state,
		walletPay: action.payload,
	}),
}, initialState);


export default cart;
