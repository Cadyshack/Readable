import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postsOperations, actions, selectors } from '../modules/posts';
import NewPost from './postList/NewPost.js';
import Modal from 'react-modal';
import PostListItem from './postList/PostListItem.js';


import Create from 'react-icons/lib/md/create';
import './PostList.css';

//import PropTypes from 'prop-types';

class PostList extends Component {

	state = {
		postModalOpen: false
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

	render() {
		const { postModalOpen } = this.state;
		const { byId, bySortedId, vote } = this.props.posts;
		const { history } = this.props;

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
									id={id}
									commentCount={byId[id].commentCount}
									voteScore={byId[id].voteScore}
									timestamp={byId[id].timestamp}
									key={id}
									history={history}
									votePost={this.props.votePost}
									vote={vote}
									deletePost={this.props.deletePost}
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
		deletePost: (id) => dispatch(postsOperations.deletePost(id))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList))


