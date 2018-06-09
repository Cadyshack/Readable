//import { combineReducers } from 'redux';

import {
	FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_SUCCESS
} from '../actions';


const initialState = {
	categories: {
		isLoading: false,
		hasErrored: false,
		catList: [],
	},
	posts: {
		byId: {},
		allIds: [],
		sort: 'date',
	},
	comments: {
		byId: {},
		allIds: [],
		sort: 'date',
	}
};

const catInitState = {
	isLoading: true,
	hasErrored: false,
	catList: []
}
function categories (state = catInitState, action) {
	const { isLoading, hasErrored, catList } = action
	switch (action.type) {
		case FETCH_CATEGORIES_REQUEST :

			return {
				...state,
				isLoading,
			}
		case FETCH_CATEGORIES_FAILURE:
			return {
				...state,
				hasErrored
			}

		case FETCH_CATEGORIES_SUCCESS:
			return {
				...state,
				catList
			}

			default :
				return state
	}
}


export default categories

