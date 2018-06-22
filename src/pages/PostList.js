import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postsOperations, actions, selectors } from '../modules/posts';
import NewPost from './postList/NewPost.js';
import EditPost from '../components/EditPost.js';
import Modal from 'react-modal';
import PostListItem from './postList/PostListItem.js';
import PropTypes from 'prop-types';
import Loading from 'react-loading';
import ErrorPage from '../components/ErrorPage.js';


import Create from 'react-icons/lib/md/create';
import './PostList.css';

class PostList extends Component {
	static propTypes = {
		getPosts: PropTypes.func.isRequired,
		sortPost: PropTypes.func.isRequired,
		addPost: PropTypes.func.isRequired,
		votePost: PropTypes.func.isRequired,
		deletePost: PropTypes.func.isRequired,
		editPost: PropTypes.func.isRequired,
		categories: PropTypes.array.isRequired,
		posts: PropTypes.shape({
			isLoading: PropTypes.bool.isRequired,
			hasErrored: PropTypes.bool.isRequired,
			byId: PropTypes.object.isRequired,
			sort: PropTypes.string.isRequired,
			bySortedId: PropTypes.array.isRequired,
			vote: PropTypes.object.isRequired
		})
	}

	state = {
		postModalOpen: false,
		editPostModal: false,
		editTitle: '',
		editBody: '',
		editPostId: '',
	}
	componentDidMount() {
		const {location} = this.props;
		let category = location.pathname;
		this.props.getPosts(category);
	}
	handleSort = (e) => {
		let sort = e.target.value;
		this.props.sortPost(sort);
	}
	openPostModal = () => {
		this.setState({postModalOpen: true})
	}
	closePostModal = () => {
		this.setState({postModalOpen: false})
	}
	openEditPostModal = (title, body, id) => {
		this.setState({
			editPostModal: true,
			editTitle: title,
			editBody: body,
			editPostId: id
		})
	}
	closeEditPostModal = () => {
		this.setState({editPostModal: false})
	}
	render() {
		const { postModalOpen, editPostModal, editTitle, editBody, editPostId } = this.state;
		const { byId, bySortedId, vote, hasErrored, isLoading } = this.props.posts;
		const { history } = this.props;

		if (hasErrored ){
  		return (
  			<ErrorPage
  				message="Can't seem to be able to retreave any posts at the moment."
  			 />
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
				<div className="sort-container">
						<label htmlFor="sort">
						sort by
							<select value={this.props.posts.sort} onChange={ this.handleSort } id="sort" name="sort">
								<option value="dateNew">New</option>
								<option value="dateOld">Old</option>
								<option value="highScore">Most Popular</option>
								<option value="lowScore">Least Popular</option>
							</select>
						</label>
					<button
						className="ripple"
						onClick={this.openPostModal}
						><Create size={16} className="create" />New Post
					</button>
				</div>
				<section className="post-list-container">
					{bySortedId.map((id) => (
						<PostListItem
								title={byId[id].title}
								author={byId[id].author}
								category={byId[id].category}
								body={byId[id].body}
								id={id}
								commentCount={byId[id].commentCount}
								voteScore={byId[id].voteScore}
								timestamp={byId[id].timestamp}
								key={id}
								history={history}
								votePost={this.props.votePost}
								vote={vote}
								deletePost={this.props.deletePost}
								editPostModalOpen={this.openEditPostModal}

							/>
					))}
				</section>
				<Modal
					className={{
						base: 'modal',
						afterOpen: 'zoomInDown',
						beforeClose: 'zoomOut'
					}}
					isOpen={postModalOpen}
					onRequestClose={this.closePostModal}
					contentLabel='Add New Post Form'
					overlayClassName={{
						base: 'overlay',
						afterOpen: '',
						beforeClose: 'overlayOut'
					}}
					closeTimeoutMS={500}
				>
					<NewPost
						onClose={ this.closePostModal }
						categories={ this.props.categories }
						addPost={ this.props.addPost }
					 />
				</Modal>

				<Modal
					className={{
						base: 'modal',
						afterOpen: 'zoomInDown',
						beforeClose: 'zoomOut'
					}}
					isOpen={editPostModal}
					onRequestClose={this.closeEditPostModal}
					contentLabel='Edit Post Form'
					overlayClassName={{
						base: 'overlay',
						afterOpen: '',
						beforeClose: 'overlayOut'
					}}
					closeTimeoutMS={500}
				>
					<EditPost
						onClose={ this.closeEditPostModal }
						editPost={ this.props.editPost }
						title={editTitle}
						body={editBody}
						id={editPostId}
					 />
				</Modal>

			</div>
		);
	}
}

function mapStateToProps ({posts, categories}) {
	return {
		posts: {
			isLoading: posts.isLoading,
			hasErrored: posts.hasErrored,
			byId: posts.byId,
			sort: posts.sort,
			bySortedId: selectors.getSortedPosts(posts),
			vote: posts.vote,
		},
		categories: selectors.getCatName(categories)
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getPosts: (data) => dispatch(postsOperations.fetchPosts(data)),
		sortPost: (sort) => dispatch(actions.sortPost(sort)),
		addPost: (post) => dispatch(postsOperations.addPost(post)),
		votePost: (id, vote) => dispatch(postsOperations.votePost(id, vote)),
		deletePost: (id) => dispatch(postsOperations.deletePost(id)),
		editPost: (id,content) => dispatch(postsOperations.editPost(id,content)),
	}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList))






































