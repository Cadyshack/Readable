import { createSelector } from 'reselect';
import { orderBy } from 'lodash-es';


const commentSort = (state) => state.sort;
const commentById = (state) => state.byId;

export const getSortedComments = createSelector(
	commentSort,
	commentById,
	(sort, allComments) => {
		let commentArray = Object.values(allComments).concat();
		let bySortId;
		switch (sort) {
			case 'dateNew':
				bySortId = orderBy(commentArray, ['timestamp'], ['desc']).map((post) => post.id);
				return bySortId;
			case 'dateOld':
				bySortId = orderBy(commentArray, ['timestamp'], ['asc']).map((post) => post.id);
				return bySortId;
			case 'highScore':
				bySortId = orderBy(commentArray, ['voteScore'], ['desc']).map((post) => post.id);
				return bySortId;
			case 'lowScore':
				bySortId = orderBy(commentArray, ['voteScore'], ['asc']).map((post) => post.id);
				return bySortId;
			default:
				return allComments;
		}
	}
);