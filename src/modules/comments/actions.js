import {
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_SUCCESS,
	SORT_COMMENTS,
	COMMENT_VOTE_REQUEST,
	COMMENT_VOTE_FAILURE,
	COMMENT_VOTE_SUCCESS,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_FAILURE,
	ADD_COMMENT_SUCCESS,
	EDIT_COMMENT_REQUEST,
	EDIT_COMMENT_FAILURE,
	EDIT_COMMENT_SUCCESS,
	DELETE_COMMENT_REQUEST,
	DELETE_COMMENT_FAILURE,
	DELETE_COMMENT_SUCCESS
} from './types.js';

export const commentsIsLoading = (bool) => {
	return {
		type: FETCH_COMMENTS_REQUEST,
		isLoading: bool
	}
}
export const commentsHasErrored = (bool) => {
	return {
		type: FETCH_COMMENTS_FAILURE,
		hasErrored: bool
	}
}
export const commentsFetchSuccess = (data) => {
	return {
		type: FETCH_COMMENTS_SUCCESS,
		comments: data
	}
}
export const sortComments = (sort) => {
	return {
		type: SORT_COMMENTS,
		sort
	}
}
export const commentVoteRequest = (bool) => {
	return {
		type: COMMENT_VOTE_REQUEST,
		isLoading: bool
	}
}
export const commentVoteFailure = (bool) => {
	return {
		type: COMMENT_VOTE_FAILURE,
		isLoading: bool
	}
}
export const commentVoteSuccess = (comment) => {
	return {
		type: COMMENT_VOTE_SUCCESS,
		comment
	}
}
export const addCommentRequest = (bool) => {
	return {
		type: ADD_COMMENT_REQUEST,
		isLoading: bool
	}
}
export const addCommentFailure = (bool) => {
	return {
		type: ADD_COMMENT_FAILURE,
		hasErrored: bool
	}
}
export const addCommentSuccess = (comment) => {
	return {
		type: ADD_COMMENT_SUCCESS,
		comment
	}
}
export const editCommentRequest = (bool) => {
	return {
		type: EDIT_COMMENT_REQUEST,
		isLoading: bool
	}
}
export const editCommentFailure = (bool) => {
	return {
		type: EDIT_COMMENT_FAILURE,
		hasErrored: bool
	}
}
export const editCommentSuccess = (comment) => {
	return {
		type: EDIT_COMMENT_SUCCESS,
		comment
	}
}
export const deleteCommentRequest = (bool) => {
	return {
		type: DELETE_COMMENT_REQUEST,
		isLoading: bool
	}
}
export const deleteCommentFailure = (bool) => {
	return {
		type: DELETE_COMMENT_FAILURE,
		hasErrored: bool
	}
}
export const deleteCommentSuccess = (comment) => {
	return {
		type: DELETE_COMMENT_SUCCESS,
		comment
	}
}
























































