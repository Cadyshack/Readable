import {postIsLoading, postHasErrored, postFetchSuccess } from './actions.js';
import {api, headers } from '../../config.js';

export const fetchPosts = (category) => dispatch => {
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
