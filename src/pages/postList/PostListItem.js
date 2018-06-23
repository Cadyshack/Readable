import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DateComponent from '../../components/DateComponent.js';

import ArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import Comment from 'react-icons/lib/md/mode-comment';
import './PostListItem.css';

const PostListItem = (props) => {
  const { title, body, author, category, commentCount, voteScore, timestamp, id, history, votePost, vote, deletePost, editPostModalOpen } = props;


  const link = (e) => {
    history.push(`/${category}/${id}`);
  }
  const catLink = (e) => {
    e.stopPropagation();
  }
	const upVote = (e) => {
    e.stopPropagation();
    if (!vote.isLoading) {
      votePost(id, 'upVote');
    }
  }
  const downVote = (e) => {
  	e.stopPropagation();
    if (!vote.isLoading){
      votePost(id, 'downVote');
    }
  }
  const editPostButton = (e) => {
    e.stopPropagation();
    editPostModalOpen(title, body, id);
  }
  const postDeletion = (e) => {
    e.stopPropagation();
    deletePost(id);

  }
  return (
    <div className="post-list-item" onClick={link} >
    	<div className="vote">
    		<ArrowUp size={30} className="upVote" onClick={upVote} />
    		<span className="score">{voteScore}</span>
    		<ArrowDown size={30} className="downVote" onClick={downVote} />
    	</div>
    	<div className="info">
	    	<h2>{title}</h2>
	    	<div className="author-info">
          <Link to={`/${category}`} className="category-link" onClick={catLink}>
            <span className="category-tag">{category}</span>
          </Link>
	    		<span className="author">{`Posted by: ${author}`}</span>
	    		<DateComponent timestamp={timestamp} />
	    	</div>
	    	<div className="edit-delete">
	    		<div>
	    			<span><Comment size={30} className="comment" />{` ${commentCount} comments`}</span>
	    		</div>
	    		<div className="buttons">
			    	<button className='ripple' onClick={editPostButton}>Edit</button>
			    	<button className='ripple' onClick={postDeletion}>Delete</button>
		    	</div>
	    	</div>
    	</div>
    </div>


  )
}

PostListItem.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  commentCount: PropTypes.number.isRequired,
  voteScore: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  votePost: PropTypes.func.isRequired,
  vote: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  editPostModalOpen: PropTypes.func.isRequired,
}

export default PostListItem;











































