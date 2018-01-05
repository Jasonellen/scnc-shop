import { createActions } from 'redux-actions';

export const {
	changeD, changeReasons, changeOrderNo,
	changeItemId, changeRefundReasonId, changeMemo,
	changeRefundValue, changePrice, changeRefundId,
	changeRefundType
} = createActions(
	'changeD',
	'changeReasons',
	'changeOrderNo',
	'changeItemId',
	'changeRefundReasonId',
	'changeMemo',
	'changeRefundValue',
	'changePrice',
	'changeRefundId',
	'changeRefundType'
)
