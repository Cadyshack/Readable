import {
	FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_FAILURE, FETCH_CATEGORIES_SUCCESS
} from './types.js';


export const categoryIsLoading = (bool) => {
	return {
		type: FETCH_CATEGORIES_REQUEST,
		isLoading: bool
	}
}

export const categoryHasErrored = (bool) => {
	return {
		type: FETCH_CATEGORIES_FAILURE,
		hasErrored: bool
	}
}

export const categoryFetchSuccess = (data) => {
	return {
		type: FETCH_CATEGORIES_SUCCESS,
		catList: data.categories
	}
}

