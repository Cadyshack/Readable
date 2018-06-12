import {categoryIsLoading, categoryHasErrored, categoryFetchSuccess } from './actions.js';
import {api, headers } from '../../config.js';

export const fetchCategories = () => dispatch => {
	dispatch(categoryIsLoading(true));

	fetch(`${api}/categories`, {headers})
		.then( (response) => {
			if (!response.ok){
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then(
			(categories) => dispatch(categoryFetchSuccess(categories)),
			(error) => {
				dispatch(categoryIsLoading(false));
				dispatch(categoryHasErrored(true));
				}

		);
}
