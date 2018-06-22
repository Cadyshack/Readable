import {
	commentsIsLoading,
	commentsHasErrored,
	commentsFetchSuccess,
	commentVoteRequest,
	commentVoteFailure,
	commentVoteSuccess,
	addCommentRequest,
	addCommentFailure,
	addCommentSuccess,
	editCommentRequest,
	editCommentFailure,
	editCommentSuccess,
	deleteCommentRequest,
	deleteCommentFailure,
	deleteCommentSuccess,
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
export const addComment = (comment) => (dispatch) => {
	dispatch(addCommentRequest(true));
	let url = api + '/comments';
	fetch(url, {
		method: 'post',
		body: comment,
		headers: {...headers},
	})
	.then( (response) => {
		if (!response.ok){
			throw Error(response.statusText);
		}
		return response.json();
	})
	.then(
		(comment) => dispatch(addCommentSuccess(comment)),
		(error) => {
			dispatch(addCommentFailure(true));
		}
	)
}

export const editComment = (id, content) => (dispatch) => {
	let url = `${api}/comments/${id}`;
	dispatch(editCommentRequest(true));
	fetch(url, {
		method: 'PUT',
		body: content,
		headers: {...headers}
	})
	.then((response) => {
		if (!response.ok){
			throw Error(response.statusText);
		}
		return response.json();
	})
	.then(
		(comment) => dispatch(editCommentSuccess(comment)),
		(error) => dispatch(editCommentFailure(true))
	)
}


export const deleteComment = (id) => (dispatch) => {
	let url = `${api}/comments/${id}`;
	dispatch(deleteCommentRequest(true));
	fetch(url, {
		method: 'DELETE',
		headers: {...headers},
	})
	.then((response) => {
		if (!response.ok){
			throw Error(response.statusText);
		}
		return response.json();
	})
	.then(
		(comment) => dispatch(deleteCommentSuccess(comment)),
		(error) => dispatch(deleteCommentFailure(true))
	)
}






























































