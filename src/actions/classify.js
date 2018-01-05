import { createActions } from 'redux-actions';

export const { changeShowTab, setClassifyData, setClassifyDetailData } = createActions(
	'changeShowTab',
	'setClassifyData',
	'setClassifyDetailData'
)
