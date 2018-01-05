import { createActions } from 'redux-actions';

export const { changePassword, changeErr } = createActions(
	'changePassword',
	'changeErr',
)
