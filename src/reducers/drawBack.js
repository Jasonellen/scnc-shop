import { handleActions } from 'redux-actions';

let initialState = {
	dsh:false, //待收货
	reasons:[[]],
	price:'',
	//退款字段
	order_no:'',
	item_id:'',
	refund_reason_id:'',
	refund_reason_name:'',
	memo:'',
	refund_value:'',
	refund_type: '0'//退款类型
}
const drawBack = handleActions({
	changeD: (state, action) => ({
		...state,
		dsh: action.payload
	}),
	changeReasons: (state, action) => ({
		...state,
		reasons: action.payload
	}),
	changeOrderNo: (state, action) => ({
		...state,
		order_no: action.payload
	}),
	changeItemId: (state, action) => ({
		...state,
		item_id: action.payload
	}),
	changeRefundReasonId: (state, action) => {
		let arr = state.reasons[0]
		let refund_reason_name = action.payload && arr.length>0 ? arr.find(function(item){
			return item.value == action.payload
		}).label : '请选择';
		return {
			...state,
			refund_reason_id: action.payload,
			refund_reason_name,
		}
	},
	changeMemo: (state, action) => ({
		...state,
		memo: action.payload
	}),
	changeRefundValue: (state, action) => ({
		...state,
		refund_value: action.payload
	}),
	changePrice: (state, action) => ({
		...state,
		price: action.payload
	}),
	changeRefundType: (state, action) => ({
		...state,
		refund_type: action.payload
	})
}, initialState);


export default drawBack;
