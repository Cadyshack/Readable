import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { commentOperations, selectors, actions } from '../../modules/comments';
import CommentItem from './commentList/CommentItem.js';
import Modal from 'react-modal';
import EditComment from './commentList/EditComment.js';
import Loading from 'react-loading';


import './CommentList.css';

class CommentList extends Component {
	static propTypes = {
		comments: PropTypes.object,
		getComments: PropTypes.func,
	}
	state = {
		editModalOpen: false,
		editBody: '',
		editCommentId: ''
	}

	componentDidMount() {
		let postId = this.props.postId;
		this.props.getComments(postId);
	}
	handleSort = (e) => {
		let sort = e.target.value;
		this.props.sortComment(sort);
	}
	openEditModal = (body,id) => {
		this.setState({
			editModalOpen: true,
			editBody: body,
			editCommentId: id,
		})
	}
	closeEditModal = () => {
		this.setState({editModalOpen: false})
	}

	render() {
		const { bySortedId, byId, hasErrored, isLoading } = this.props.comments;

		if (hasErrored ){
  		return (
  			<div className="commentHasErrored">
  				<p>Unfortunately, we can't seem to get to the comments at the moment.</p>
  			</div>
			)
  	}
  	if ( isLoading ) {
  		return (
  			<div className="isLoading">
	  			<Loading type="spin" className="loader" color='#263238'  />
  			</div>
  		)
  	}


		return (
			<div className='comment-list'>
				<div className='sort-container'>
					<label htmlFor="sort">
						sort comments by
						<select value={this.props.comments.sort} onChange={ this.handleSort } id="sort" name="sort">
							<option value="dateNew">New</option>
							<option value="dateOld">Old</option>
							<option value="highScore">Most Popular</option>
							<option value="lowScore">Least Popular</option>
						</select>
					</label>
				</div>

				{bySortedId.map((id) => (
					<CommentItem
						author={byId[id].author}
						body={byId[id].body}
						timestamp={byId[id].timestamp}
						voteScore={byId[id].voteScore}
						key={id}
						id={id}
						voteComment={this.props.voteComment}
						openEditModal={this.openEditModal}
						deleteComment={this.props.deleteComment}
					/>

				))}
				<Modal
				className={{
					base: 'modal',
					afterOpen: 'zoomInDown',
					beforeClose: 'zoomOut'
				}}
				isOpen={this.state.editModalOpen}
				onRequestClose={this.closeEditModal}
				contentLabel='Edit Comment Form'
				overlayClassName={{
					base: 'overlay',
					afterOpen: '',
					beforeClose: 'overlayOut'
				}}
				closeTimeoutMS={500}
				>
					<EditComment
						onClose={this.closeEditModal}
						body={this.state.editBody}
						id={this.state.editCommentId}
						editComment={this.props.editComment}

					/>
				</Modal>
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
		voteComment: (id, vote) => dispatch(commentOperations.voteComment(id, vote)),
		editComment: (id, content) => dispatch(commentOperations.editComment(id, content)),
		deleteComment: (id) => dispatch(commentOperations.deleteComment(id))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentList))







































































