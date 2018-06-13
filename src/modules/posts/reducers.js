
import {
	FETCH_POSTS_REQUEST,
	FETCH_POSTS_FAILURE,
	FETCH_POSTS_SUCCESS
} from './types.js';

const postInitState = {
	isLoading: false,
	hasErrored: false,
	byId: {},
	allIds: [],
	sort: 'date'
}

export function posts (state = postInitState, action) {
	const { isLoading, hasErrored, posts } = action;
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
			default :
				return state
	}
};


export default posts;
