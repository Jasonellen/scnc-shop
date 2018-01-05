import { createActions } from 'redux-actions';

export const { changeName, changeCard, changeCardNumber, changeBankData } = createActions(
	'changeBankName',
	'changeCard',
	'changeCardNumber',
	'changeBankData'
)
