import {
	postIsLoading,
	postHasErrored,
	postFetchSuccess,
	addPostLoading,
	addPostErrored,
	addPostSuccess,
	voteRequest,
	voteFailure,
	voteSuccess,
	deletePostRequest,
	deletePostFailure,
	deletePostSuccess,
	editPostRequest,
	editPostFailure,
	editPostSuccess,
	postDetailIsLoading,
	postDetailHasErrored,
	postDetailFetchSuccess
} from './actions.js';

import {api, headers } from '../../config.js';

export const fetchPosts = (category) => (dispatch) => {
	dispatch(postIsLoading(true));
	let url = category === '/' ? `${api}/posts` : `${api}${category}/posts`;

	fetch(url, {headers})
		.then( (response) => {

			if (!response.ok){
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then(
			(posts) => dispatch(postFetchSuccess(posts)),
			(error) => {
				dispatch(postIsLoading(false));
				dispatch(postHasErrored(true));
				}
		);
}

export const fetchPostById = (id) => (dispatch) => {
	dispatch(postDetailIsLoading(true));
	let url = `${api}/posts/${id}`;
	fetch(url, {headers})
		.then( (response) => {

			if (!response.ok){
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then(
			(post) => dispatch(postDetailFetchSuccess(post)),
			(error) => {
				dispatch(postDetailIsLoading(false));
				dispatch(postDetailHasErrored(true));
				}
		);
}

export const addPost = (post) => (dispatch) => {
	dispatch(addPostLoading(true));
	let url = api + '/posts';
	fetch(url, {
		method: 'post',
		body: post,
		headers: {...headers},
	})
	.then( (response) => {
		if (!response.ok){
			throw Error(response.statusText);
		}
		return response.json();
	})
	.then(
		(post) => dispatch(addPostSuccess(post)),
		(error) => {
			dispatch(addPostLoading(false));
			dispatch(addPostErrored(true));
		}
	)
}


export const votePost = (id, vote) => (dispatch) => {
	let url = `${api}/posts/${id}`;
	dispatch(voteRequest(true));
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
		(post) => dispatch(voteSuccess(post)),
		(error) => {
			dispatch(voteRequest(false));
			dispatch(voteFailure(true));
		}
	)
}

export const deletePost = (id) => (dispatch) => {
	let url = `${api}/posts/${id}`;
	dispatch(deletePostRequest(true));
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
		(post) => {
			dispatch(deletePostSuccess(post))
		},
		(error) => {
			dispatch(deletePostRequest(false));
			dispatch(deletePostFailure(true));
		}
	)
}

export const editPost = (id, content) => (dispatch) => {
	let url = `${api}/posts/${id}`;
	dispatch(editPostRequest(true));
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
		(post) => dispatch(editPostSuccess(post)),
		(error) => {
			dispatch(editPostRequest(false));
			dispatch(editPostFailure(true));
		}
	)
}















































