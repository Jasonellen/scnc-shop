import { handleActions } from 'redux-actions';

let initialState = {
	addressData: [],
}
const addAddress = handleActions({
	setAddress: (state, action) => ({
		...state,
		addressData: action.payload
	})
}, initialState);


export default addAddress;
