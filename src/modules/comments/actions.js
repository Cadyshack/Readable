import {
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_SUCCESS,
	SORT_COMMENTS,
	COMMENT_VOTE_REQUEST,
	COMMENT_VOTE_FAILURE,
	COMMENT_VOTE_SUCCESS
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