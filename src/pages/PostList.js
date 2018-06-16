import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postsOperations, actions } from '../modules/posts';
import NewPost from './postList/NewPost.js';
import Modal from 'react-modal';

import Create from 'react-icons/lib/md/create';
import './PostList.css';

//import PropTypes from 'prop-types';

/*const date = new Date(1528737694553);
		const options = { year:'numeric', month:'long', day:'numeric', hour12: true, hour: '2-digit', minute: '2-digit' };
		const formattedDate = date.toLocaleDateString("en-CA", options);*/


class PostList extends Component {

	state = {
		sort: 'date',
		postModalOpen: false
	}

	componentDidMount() {
		const {location} = this.props;
		let category = location.pathname;
		this.props.getPosts(category);
	}

	handleSort = (e) => {
		let sort = e.target.value;
		this.setState({ sort }, () => {
			this.props.sortPost(sort)
		});
	}
	openPostModal = () => {
		this.setState({postModalOpen: true})
	}
	closePostModal = () => {
		this.setState({postModalOpen: false})
	}

	render() {
		const { postModalOpen } = this.state;

		return (
			<div className="container">
				<div className="sort-container">
						<label htmlFor="sort">
						sort by:
							<select value={this.state.sort} onChange={ this.handleSort } id="sort" name="sort">
								<option value="date">date</option>
								<option value="score">score</option>
							</select>
						</label>
					<button
						className="ripple"
						onClick={this.openPostModal}
						><Create size={16} className="create" />New Post
					</button>
				</div>

				<h1>This is PostList.js</h1>
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
		posts: posts,
		categories: categories.catList.map((cat) => cat.name)
	}
}
function mapDispatchToProps (dispatch) {
	return {
		getPosts: (data) => dispatch(postsOperations.fetchPosts(data)),
		sortPost: (sort) => dispatch(actions.sortPost(sort)),
		addPost: (post) => dispatch(postsOperations.addPost(post))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList))


