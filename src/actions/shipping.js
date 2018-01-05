import { createActions } from 'redux-actions';

export const { changeShipNo, changeList, changeName, changeLogo, changeStatus} = createActions(
	'changeShipNo',
	'changeList',
	'changeName',
	'changeLogo',
	'changeStatus'
)
