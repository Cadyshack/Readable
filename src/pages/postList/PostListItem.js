import React from 'react';
import { Link } from 'react-router-dom';
import ArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import Comment from 'react-icons/lib/md/mode-comment';
import './PostListItem.css';

const PostListItem = (props) => {
  const { title, author, category, commentCount, voteScore, timestamp, id, history } = props;
  let date = new Date(timestamp);
  const options = { year:'numeric', month:'long', day:'numeric', hour12: true, hour: '2-digit', minute: '2-digit' };
  let formattedDate = date.toLocaleDateString("en-CA", options);

	// const link = (e) => {
	// 	history.push(`/${category}/${id}`);
	// }

	const testing = (e) => {
  	e.preventDefault();

  }
  const upVote = (e) => {
    e.preventDefault();

  }
  const downVote = (e) => {
  	e.preventDefault();
  }

  return (
    <Link to={`/${category}/${id}`} className="post-list-item">
    	<div className="vote">
    		<ArrowUp size={30} className="upVote" onClick={upVote} />
    		<span>{voteScore}</span>
    		<ArrowDown size={30} className="downVote" onClick={downVote} />
    	</div>
    	<div className="info">
	    	<h2>{title}</h2>
	    	<div className="author-info">
          <Link to={`/${category}`} className="category-link">
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
			    	<button className='ripple' onClick={testing}>Edit</button>
			    	<button className='ripple' onClick={testing}>Delete</button>
		    	</div>


	    	</div>
    	</div>
    </Link>


  )
}

export default PostListItem;