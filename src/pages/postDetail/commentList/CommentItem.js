import React from 'react';
import PropTypes from 'prop-types';
import DateComponent from '../../../components/DateComponent.js';


import ArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import './CommentItem.css';

const CommentItem = (props) => {
	const { voteScore, body, author, timestamp, id, voteComment, openEditModal, deleteComment } = props;

	const upVote = (e) => {
		voteComment(id, 'upVote');
	}
	const downVote = (e) => {
		voteComment(id, 'downVote');
	}
	const editComment = (e) => {
		openEditModal(body, id);
	}
	const commentDeletion = () => {
		deleteComment(id);
	}
	return (
		<div className="comment-list-item">
			<div className="vote">
    		<ArrowUp size={30} className="upVote" onClick={upVote} />
    		<span className="score">{voteScore}</span>
    		<ArrowDown size={30} className="downVote" onClick={downVote} />
    	</div>
    	<div className='comment-author'>
	    	<span>{author} says:</span><DateComponent timestamp={timestamp} />
    	</div>
    	<div className="comment-body"><p>{body}</p></div>
    	<div className="buttons">
	    	<button className='ripple' onClick={editComment} >Edit</button>
	    	<button className='ripple' onClick={commentDeletion}>Delete</button>
	  	</div>
		</div>
	);
}

export default CommentItem;

CommentItem.propTypes = {
	author: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
	timestamp: PropTypes.number.isRequired,
	voteScore: PropTypes.number.isRequired,
	voteComment: PropTypes.func.isRequired,
	openEditModal: PropTypes.func.isRequired,
	deleteComment: PropTypes.func.isRequired
}