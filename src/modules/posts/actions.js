import {
	FETCH_POSTS_REQUEST,
	FETCH_POSTS_FAILURE,
	FETCH_POSTS_SUCCESS,
	SORT_POSTS,
	ADD_POST_REQUEST,
	ADD_POST_FAILURE,
	ADD_POST_SUCCESS
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

export const sortPost = (sort) => {
	return {
		type: SORT_POSTS,
		sort
	}
}
export const addPostLoading = (bool) => {
	return {
		type: ADD_POST_REQUEST,
		isLoading: bool
	}
}
export const addPostErrored = (bool) => {
	return {
		type: ADD_POST_FAILURE,
		hasErrored: bool
	}
}
export const addPostSuccess = (post) => {
	return {
		type: ADD_POST_SUCCESS,
		post
	}
}
