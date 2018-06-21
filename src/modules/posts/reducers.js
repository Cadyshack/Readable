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

const postInitState = {
	isLoading: false,
	hasErrored: false,
	byId: {},
	sort: 'dateNew',
	vote: {
		isLoading: false,
		hasErrored: false,
	}
}

function posts (state = postInitState, action) {
	const { isLoading, hasErrored, posts, post, sort } = action;

	switch (action.type) {
		case FETCH_POSTS_REQUEST:
		case ADD_POST_REQUEST:
		case DELETE_POST_REQUEST:
		case EDIT_POST_REQUEST:
		case FETCH_POST_REQUEST:
			return {
				...state,
				isLoading,
				hasErrored: false
			}
		case FETCH_POSTS_FAILURE:
		case ADD_POST_FAILURE:
		case DELETE_POST_FAILURE:
		case EDIT_POST_FAILURE:
		case FETCH_POST_FAILURE:
			return {
				...state,
				hasErrored,
				isLoading: false
			}
		case FETCH_POSTS_SUCCESS:
			return {
				...state,
				hasErrored: false,
				isLoading: false,
				byId: posts.reduce((obj, post) => {
					obj[post.id] = {...post}
					return obj
				}, {})
			}
		case FETCH_POST_SUCCESS:
			return {
				...state,
				hasErrored: false,
				isLoading: false,
				byId: {
					[post.id]: {
						...post
					}
				}
			}
		case ADD_POST_SUCCESS:
			return {
				...state,
				hasErrored: false,
				isLoading: false,
				byId: {
					...state.byId,
					[post.id]: {
						...post
					}
				}
			}

		case SORT_POSTS:
			return {
				...state,
				sort
			}
		case POST_VOTE_REQUEST:
			return {
				...state,
				vote: {
					...state.vote,
					isLoading,
					hasErrored: false
				}
			}
		case POST_VOTE_FAILURE:
			return {
				...state,
				vote: {
					...state.vote,
					hasErrored,
					isLoading: false
				}
			}

		case POST_VOTE_SUCCESS:
			return {
				...state,
				byId: {
					...state.byId,
					[post.id]: {
						...post
					}
				},
				vote: {
					...state.vote,
					hasErrored: false,
					isLoading: false
				}
			}

		case EDIT_POST_SUCCESS :
			return {
				...state,
				isLoading: false,
				hasErrored: false,
				byId: {
					...state.byId,
					[post.id]: {
						...post
					}
				}
			}

		case DELETE_POST_SUCCESS:
			let byIdCopy = Object.assign({}, state.byId);
			delete byIdCopy[post.id];
			return {
				...state,
				hasErrored: false,
				isLoading: false,
				byId: {
					...byIdCopy,
				}
			}


		default :
			return state
	}
};


export default posts;




































































