import {
	FETCH_CATEGORIES_REQUEST,
	FETCH_CATEGORIES_FAILURE,
	FETCH_CATEGORIES_SUCCESS
} from './types.js';

const catInitState = {
	isLoading: false,
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
				hasErrored: false,
			}
		case FETCH_CATEGORIES_FAILURE:
			return {
				...state,
				hasErrored,
				isLoading: false,
			}

		case FETCH_CATEGORIES_SUCCESS:
			return {
				isLoading: false,
				hasErrored: false,
				catList
			}
			default :
				return state
	}
}


export default categories;

