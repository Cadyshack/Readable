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
		case ADD_COMMENT_REQUEST:
		case EDIT_COMMENT_REQUEST:
		case DELETE_COMMENT_REQUEST:
			return {
				...state,
				isLoading,
				hasErrored: false,
			}
		case FETCH_COMMENTS_FAILURE:
		case ADD_COMMENT_FAILURE:
		case EDIT_COMMENT_FAILURE:
		case DELETE_COMMENT_FAILURE:
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
		case ADD_COMMENT_SUCCESS:
		case EDIT_COMMENT_SUCCESS:
			return {
				...state,
				isLoading: false,
				hasErrored: false,
				byId: {
					...state.byId,
					[comment.id]: {
						...comment
					}
				}
			}
		case DELETE_COMMENT_SUCCESS:
			let byIdCopy = Object.assign({}, state.byId);
			delete byIdCopy[comment.id];
			return {
				...state,
				hasErrored: false,
				isLoading: false,
				byId: {
					...byIdCopy,
				},
			}
		default:
			return state
	}

}

export default comments;

































































