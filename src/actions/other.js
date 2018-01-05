import { createActions } from 'redux-actions';

export const {
	changeProduct, changeBankCards, changeUser, changeBalance,
	changeToken, changeCode, changeChatInfo, changeExpertChatInfo
} = createActions(
		'changeBankCards',
		'changeUser',
		'changeBalance',
		'changeCode',
		'changeChatInfo',
		'changeExpertChatInfo',
	)
