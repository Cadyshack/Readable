import { createSelector } from 'reselect';
import { orderBy } from 'lodash-es';

const getCatList = (state) => state.catList;

export const getCatName = createSelector(
	getCatList,
	(categories) => categories.map((cat) => cat.name)
);

const postSort = (state) => state.sort;
const postById = (state) => state.byId;

export const getSortedPosts = createSelector(
	postSort,
	postById,
	(sort, allPosts) => {
		let postArray = Object.values(allPosts);
		let bySortId;
		switch (sort) {
			case 'dateNew':
				bySortId = orderBy(postArray, ['timestamp'], ['desc']).map((post) => post.id);
				return bySortId;
			case 'dateOld':
				bySortId = orderBy(postArray, ['timestamp'], ['asc']).map((post) => post.id);
				return bySortId;
			case 'highScore':
				bySortId = orderBy(postArray, ['voteScore'], ['desc']).map((post) => post.id);
				return bySortId;
			case 'lowScore':
				bySortId = orderBy(postArray, ['voteScore'], ['asc']).map((post) => post.id);
				return bySortId;
			default:
				return allPosts
		}
	}
);