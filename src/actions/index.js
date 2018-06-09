import uuid from 'uuid/v4';



export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_COMMENTS_REQUEST = 'FETCH_COMMENTS_REQUEST';
export const FETCH_COMMENTS_FAILURE = 'FETCH_COMMENTS_FAILURE';
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const UP_VOTE = 'UP_VOTE';
export const DOWN_VOTE = 'DOWN_VOTE';
export const SORT_POSTS = 'SORT_POSTS';
export const SORT_COMMENTS = 'SORT_COMMENTS';
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';



const api = "http://localhost:3001";
let token = localStorage.token;
if (!token){
	token = uuid();
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}


export const categoryIsLoading = (bool) => {
	return {
		type: FETCH_CATEGORIES_REQUEST,
		isLoading: bool
	}
}

export const categoryHasErrored = (bool) => {
	return {
		type: FETCH_CATEGORIES_FAILURE,
		hasErrored: bool
	}
}

export const categoryFetchSuccess = (data) => {
	return {
		type: FETCH_CATEGORIES_SUCCESS,
		catList: data.categories
	}
}

export const fetchCategories = () => dispatch => {
	dispatch(categoryIsLoading(true));

	fetch(`${api}/categories`, {headers})
		.then( (response) => {
			if (!response.ok){
				throw Error(response.statusText);
			}
			dispatch(categoryIsLoading(false));
			return response.json();
		})
		.then(
			(categories) => dispatch(categoryFetchSuccess(categories)),
			(error) => dispatch(categoryHasErrored(true))
		);
}















