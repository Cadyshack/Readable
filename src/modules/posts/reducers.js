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
	POST_VOTE_SUCCESS
} from './types.js';

const postInitState = {
	isLoading: false,
	hasErrored: false,
	byId: {},
	allIds: [],
	sort: 'dateNew',
	vote: {
		isLoading: false,
		hasErrored: false
	}
}

export function posts (state = postInitState, action) {
	const { isLoading, hasErrored, posts, post, sort } = action;
	switch (action.type) {
		case FETCH_POSTS_REQUEST:
			return {
				...state,
				isLoading,
				hasErrored: false
			}
		case FETCH_POSTS_FAILURE:
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
				}, {}),
				allIds: posts.map((post) => post.id)
			}
		case ADD_POST_REQUEST:
			return {
				...state,
				isLoading,
				hasErrored: false
			}
		case ADD_POST_FAILURE:
			return {
				...state,
				hasErrored,
				isLoading: false
			}
		case ADD_POST_SUCCESS:

			return {
				...state,
				hasErrored: false,
				isLoading: false,
				allIds: [...state.allIds,	post.id ],
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

			default :
				return state
	}
};


export default posts;




































































