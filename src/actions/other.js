import { createActions } from 'redux-actions';

export const {
	changeProduct, changeBankCards, changeUser, changeBalance,
	changeToken, changeCode, changeChatInfo, changeExpertChatInfo,
	renameModal
} = createActions(
		'changeBankCards',
		'changeUser',
		'changeBalance',
		'changeCode',
		'changeChatInfo',
		'changeExpertChatInfo',
		'renameModal'
	)
