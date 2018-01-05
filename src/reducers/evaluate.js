
import { handleActions } from 'redux-actions';

let initialState = {
	save_comments:[], //评论
}
const evaluate = handleActions({
	changeSaveComments: (state, action) => ({
		...state,
		save_comments: action.payload
	}),
}, initialState);


export default evaluate;
