import { handleActions } from 'redux-actions';

let initialState = {
	password: '',
	err:''
}
const Search = handleActions({
	changePassword: (state, action) => ({
		...state,
		password: action.payload
	}),
	changeErr: (state, action) => ({
		...state,
		err: action.payload
	})
}, initialState);


export default Search;
