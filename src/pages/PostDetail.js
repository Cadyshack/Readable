import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postsOperations } from '../modules/posts';
import Loading from 'react-loading';
import ErrorPage from '../components/ErrorPage.js';
import Modal from 'react-modal';
import EditPost from '../components/EditPost.js';
import CommentList from './postDetail/CommentList.js';
import DateComponent from '../components/DateComponent.js';

import './PostDetail.css';
import ArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import ArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import Comment from 'react-icons/lib/md/mode-comment';



class PostDetail extends Component {

	static propTypes = {
		id: PropTypes.string.isRequired,
		isLoading: PropTypes.bool.isRequired,
		hasErrored: PropTypes.bool.isRequired,
	}

	state = {
		editModalOpen: false,
	}

	componentDidMount() {
		let id = this.props.id;
		if (!this.props.post){
			this.props.getPostById(id)
		}
	}
	openEditModal = () => {
		this.setState({editModalOpen: true})
	}
	closeEditModal = () => {
		this.setState({editModalOpen: false})
	}
	upVote = (e) => {
		let { vote, votePost } = this.props;
		let id = this.props.id;

    if (!vote.isLoading) {
      votePost(id, 'upVote');
    }
  }
  downVote = (e) => {
  	let { vote, votePost } = this.props;
  	let id = this.props.id;
    if (!vote.isLoading){
      votePost(id, 'downVote');
    }
  }

  postDeletion = (e) => {
  	let id = this.props.id;
  	const deletePost = this.props.deletePost;
    deletePost(id);
    this.props.history.push('/');
  }

	render() {
		const { post, isLoading, hasErrored,id } = this.props;


		if (hasErrored || post == null){
  		return (
  			<ErrorPage />
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
	    <div className="container">
	    {post !== null &&
	    	<section className='post-detail-container'>
	    		<div className="post-detail-header">
	    			<div className="vote">
			    		<ArrowUp size={30} className="upVote" onClick={this.upVote}  />
			    		<span>{post.voteScore}</span>
			    		<ArrowDown size={30} className="downVote" onClick={this.downVote} />
			    	</div>
			    	<div className="post-detail-info">
			    		<div className="author">
			    			<span >Posted by {post.author}</span><span className="date">
			    			<DateComponent timestamp={post.timestamp} />

			    			</span>
			    		</div>
			    		<h2>{post.title}</h2>
			    	</div>
	    		</div>
	    		<div className="post-detail-body">
		    		{post.body}
		    	</div>
		    	<div className="edit-delete">
		    		<div>
		    			<span><Comment size={30} className="comment" />{` ${post.commentCount} coments`}</span>
		    		</div>
		    		<div className="buttons">
				    	<button className='ripple' onClick={this.openEditModal} >Edit</button>
				    	<button className='ripple' onClick={this.postDeletion} >Delete</button>
			    	</div>
		    	</div>

		    	<CommentList
		    		postId={id}
		    	 />

	    	</section>
	    }
	    <Modal
				className={{
					base: 'modal',
					afterOpen: 'zoomInDown',
					beforeClose: 'zoomOut'
				}}
				isOpen={this.state.editModalOpen}
				onRequestClose={this.closeEditModal}
				contentLabel='Edit Post Form'
				overlayClassName={{
					base: 'overlay',
					afterOpen: '',
					beforeClose: 'overlayOut'
				}}
				closeTimeoutMS={500}
			>
					<EditPost
						onClose={ this.closeEditModal }
						editPost={ this.props.editPost }
						title={this.props.post.title}
						body={this.props.post.body}
						id={this.props.post.id}
					 />
				</Modal>
	    </div>
	  )
	}

}

function mapStateToProps ({posts}, ownProps) {
	const id = ownProps.id;
	return {
		post: posts.byId[id] ? posts.byId[id] : null,
		isLoading: posts.isLoading,
		hasErrored: posts.hasErrored,
		vote: posts.vote
	}
}

function mapDistpatchToProps (dispatch) {
	return {
		getPostById: (id) => dispatch(postsOperations.fetchPostById(id)),
		votePost: (id, vote) => dispatch(postsOperations.votePost(id, vote)),
		deletePost: (id) => dispatch(postsOperations.deletePost(id)),
		editPost: (id,content) => dispatch(postsOperations.editPost(id,content)),
	}
}




export default withRouter(connect(mapStateToProps,mapDistpatchToProps)(PostDetail))













