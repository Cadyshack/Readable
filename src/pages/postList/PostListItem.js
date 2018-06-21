import React from 'react';
import { Link } from 'react-router-dom';

import ArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import Comment from 'react-icons/lib/md/mode-comment';
import './PostListItem.css';

const PostListItem = (props) => {
  const { title, body, author, category, commentCount, voteScore, timestamp, id, history, votePost, vote, deletePost, editPostModalOpen } = props;
  let date = new Date(timestamp);
  //const options = { year:'numeric', month:'long', day:'numeric', hour12: true, hour: '2-digit', minute: '2-digit' };
  const options = { year:'numeric', month:'long', day:'numeric' };
  let formattedDate = date.toLocaleDateString("en-CA", options);

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
	    		<span className="date-info">{formattedDate}</span>
	    	</div>
	    	<div className="edit-delete">
	    		<div>
	    			<span><Comment size={30} className="comment" />{` ${commentCount} coments`}</span>
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

export default PostListItem;