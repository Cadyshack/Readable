import {
	commentsIsLoading,
	commentsHasErrored,
	commentsFetchSuccess,
	commentVoteRequest,
	commentVoteFailure,
	commentVoteSuccess
} from './actions.js';

import { api, headers } from '../../config.js';

export const fetchComments = (postId) => (dispatch) => {
	dispatch(commentsIsLoading(true));
	let url = `${api}/posts/${postId}/comments`;

	fetch(url, {headers})
	.then( (response) => {
		if (!response.ok){
			throw Error(response.statusText);
		}
		return response.json();
	})
	.then(
		(comments) => dispatch(commentsFetchSuccess(comments)),
		(error) => dispatch(commentsHasErrored(true))
	);
}

export const voteComment = (id, vote) => (dispatch) => {
	let url = `${api}/comments/${id}`;
	dispatch(commentVoteRequest(true));
	fetch(url, {
		method: 'post',
		body: JSON.stringify({option: vote}),
		headers: {...headers},
	})
	.then((response) => {
		if (!response.ok){
			throw Error(response.statusText);
		}
		return response.json();
	})
	.then(
		(comment) => dispatch(commentVoteSuccess(comment)),
		(error) => {
			dispatch(commentVoteRequest(false));
			dispatch(commentVoteFailure(true));
		}
	)
}