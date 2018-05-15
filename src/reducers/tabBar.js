import { handleActions } from 'redux-actions';

let initialState = {
	selectedTab: 'home'
}
const cart = handleActions({
	changeSelect: (state, action) => {
		return {
			...state,
			selectedTab: action.payload
		}
	}
}, initialState);


export default cart;
