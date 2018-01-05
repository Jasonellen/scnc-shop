import { handleActions } from 'redux-actions';

let initialState = {
	show: false,
	searchResultPage: false,
	value:'',
	hotData:[],
	productData: [],
	historyData: JSON.parse(localStorage.getItem('historyData')) || []
}
const Search = handleActions({
	changeShow: (state, action) => ({
		...state,
		show: action.payload
	}),
	changeResultPage: (state, action) => ({
		...state,
		searchResultPage: action.payload
	}),
	changeValue: (state, action) => ({
		...state,
		value: action.payload
	}),
	changeProductData: (state, action) => ({
		...state,
		productData: action.payload
	}),
	changeHotData: (state, action) => ({
		...state,
		hotData: action.payload
	}),
	changeHistoryData:(state, action) => ({
		...state,
		historyData: action.payload
	})
}, initialState);


export default Search;
