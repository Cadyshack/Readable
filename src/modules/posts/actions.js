import {
	FETCH_POSTS_REQUEST,
	FETCH_POSTS_FAILURE,
	FETCH_POSTS_SUCCESS
} from './types.js';

export const postIsLoading = (bool) => {
	return {
		type: FETCH_POSTS_REQUEST,
		isLoading: bool
	}
}

export const postHasErrored = (bool) => {
	return {
		type: FETCH_POSTS_FAILURE,
		hasErrored: bool
	}
}

export const postFetchSuccess = (data) => {
	return {
		type: FETCH_POSTS_SUCCESS,
		posts: data
	}
}

