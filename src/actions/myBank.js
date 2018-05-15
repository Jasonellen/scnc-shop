import { createActions } from 'redux-actions';

export const { changeBankName, changeCard, changeCardNumber, changeBankData } = createActions(
	'changeBankName',
	'changeCard',
	'changeCardNumber',
	'changeBankData'
)
