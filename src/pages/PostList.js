import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postsOperations } from '../modules/posts';
import Create from 'react-icons/lib/md/create';
import './PostList.css';

//import PropTypes from 'prop-types';

/*const date = new Date(1528737694553);
		const options = { year:'numeric', month:'long', day:'numeric', hour12: true, hour: '2-digit', minute: '2-digit' };
		const formattedDate = date.toLocaleDateString("en-CA", options);*/


class PostList extends Component {

	componentDidMount() {
		const {location} = this.props;
		let category = location.pathname;
		this.props.getPosts(category);

	}

	render() {
		const { posts } = this.props;

		return (
			<div className="container">
				<div className="sort-container">
						<label htmlFor="sort">
						sort:
							<select id="sort" name="sort">
								<option value="date">date</option>
								<option value="score">score</option>
							</select>
						</label>
					<button className="waves-effect btn"><Create size={30} className="create" />New Post</button>
				</div>

				<h1>This is PostList.js</h1>
			</div>
		);
	}
}


function mapStateToProps ({posts}) {
	return {
		posts: posts
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getPosts: (data) => dispatch(postsOperations.fetchPosts(data))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList))


