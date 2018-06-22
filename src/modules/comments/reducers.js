import {
	FETCH_COMMENTS_REQUEST,
	FETCH_COMMENTS_FAILURE,
	FETCH_COMMENTS_SUCCESS,
	SORT_COMMENTS,
	COMMENT_VOTE_REQUEST,
	COMMENT_VOTE_FAILURE,
	COMMENT_VOTE_SUCCESS
} from './types.js';

const commentsInitState = {
	isLoading: false,
	hasErrored: false,
	sort: 'dateNew',
	byId: {},
	vote: {
		isLoading: false,
		hasErrored: false,
	}
}

function comments (state = commentsInitState, action ) {
	const { isLoading, hasErrored, comments, sort, comment } = action;

	switch (action.type) {
		case FETCH_COMMENTS_REQUEST:
			return {
				...state,
				isLoading,
				hasErrored: false,
			}
		case FETCH_COMMENTS_FAILURE:
			return {
				...state,
				hasErrored,
				isLoading: false,
			}
		case FETCH_COMMENTS_SUCCESS:
			return {
				...state,
				hasErrored: false,
				isLoading: false,
				byId: comments.reduce((obj,comment) => {
					obj[comment.id] = { ...comment }
					return obj
				}, {})
			}
		case SORT_COMMENTS:
			return {
				...state,
				sort
			}
		case COMMENT_VOTE_REQUEST:
			return {
				...state,
				vote: {
					...state.vote,
					isLoading,
					hasErrored: false
				}
			}
		case COMMENT_VOTE_FAILURE:
			return {
				...state,
				vote: {
					...state.vote,
					hasErrored,
					isLoading: false
				}
			}
		case COMMENT_VOTE_SUCCESS:
			return {
				...state,
				byId: {
					...state.byId,
					[comment.id]: {
						...comment
					}
				},
				vote: {
					...state.vote,
					hasErrored: false,
					isLoading: false
				}
			}

		default:
			return state
	}

}

export default comments;

































































