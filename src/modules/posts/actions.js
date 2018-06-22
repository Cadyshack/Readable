import {
	FETCH_POSTS_REQUEST,
	FETCH_POSTS_FAILURE,
	FETCH_POSTS_SUCCESS,
	SORT_POSTS,
	ADD_POST_REQUEST,
	ADD_POST_FAILURE,
	ADD_POST_SUCCESS,
	POST_VOTE_REQUEST,
	POST_VOTE_FAILURE,
	POST_VOTE_SUCCESS,
	DELETE_POST_REQUEST,
	DELETE_POST_FAILURE,
	DELETE_POST_SUCCESS,
	EDIT_POST_REQUEST,
	EDIT_POST_FAILURE,
	EDIT_POST_SUCCESS,
	FETCH_POST_REQUEST,
	FETCH_POST_FAILURE,
	FETCH_POST_SUCCESS,
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
export const voteRequest = (bool) => {
	return {
		type: POST_VOTE_REQUEST,
		isLoading: bool
	}
}
export const voteFailure = (bool) => {
	return {
		type: POST_VOTE_FAILURE,
		hasErrored: bool
	}
}
export const voteSuccess = (post) => {
	return {
		type: POST_VOTE_SUCCESS,
		post
	}
}

export const deletePostRequest = (bool) => {
	return {
		type: DELETE_POST_REQUEST,
		isLoading: bool
	}
}
export const deletePostFailure = (bool) => {
	return {
		type: DELETE_POST_FAILURE,
		hasErrored: bool
	}
}
export const deletePostSuccess = (post ) => {
	return {
		type: DELETE_POST_SUCCESS,
		post
	}
}

export const editPostRequest = (bool) => {
	return {
		type: EDIT_POST_REQUEST,
		isLoading: bool
	}
}
export const editPostFailure = (bool) => {
	return {
		type: EDIT_POST_FAILURE,
		hasErrored: bool
	}
}
export const editPostSuccess = (post) => {
	return {
		type: EDIT_POST_SUCCESS,
		post
	}
}

export const postDetailIsLoading = (bool) => {
	return {
		type: FETCH_POST_REQUEST,
		isLoading: bool
	}
}

export const postDetailHasErrored = (bool) => {
	return {
		type: FETCH_POST_FAILURE,
		hasErrored: bool
	}
}

export const postDetailFetchSuccess = (post) => {
	return {
		type: FETCH_POST_SUCCESS,
		post
	}
}












































