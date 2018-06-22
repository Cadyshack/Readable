import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { commentOperations, selectors, actions } from '../../modules/comments';
import CommentItem from './commentList/CommentItem.js';

class CommentList extends Component {
	static propTypes = {
		comments: PropTypes.object,
		getComments: PropTypes.func,
	}
	componentDidMount() {
		let postId = this.props.postId;
		this.props.getComments(postId);
	}
	handleSort = (e) => {
		let sort = e.target.value;
		this.props.sortComment(sort);
	}

	render() {
		const { bySortedId, byId } = this.props.comments;

		return (
			<div>

				<label htmlFor="sort">
					sort comments by
					<select value={this.props.comments.sort} onChange={ this.handleSort } id="sort" name="sort">
						<option value="dateNew">New</option>
						<option value="dateOld">Old</option>
						<option value="highScore">Most Popular</option>
						<option value="lowScore">Least Popular</option>
					</select>
				</label>

				{bySortedId.map((id) => (
					<CommentItem
						author={byId[id].author}
						body={byId[id].body}
						timestamp={byId[id].timestamp}
						voteScore={byId[id].voteScore}
						key={id}
						id={id}
						voteComment={this.props.voteComment}

					/>

				))}


			</div>
		)
	}
}
function mapStateToProps ({comments }){
	return {
		comments: {
			...comments,
			bySortedId: selectors.getSortedComments(comments)
		}
	}
}
function mapDispatchToProps (dispatch) {
	return {
		getComments: (postId) => dispatch(commentOperations.fetchComments(postId)),
		sortComment: (sort) => dispatch(actions.sortComments(sort)),
		voteComment: (id, vote) => dispatch(commentOperations.voteComment(id, vote))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentList))







































































