import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postsOperations } from '../modules/posts';
//import PropTypes from 'prop-types';

class PostList extends Component {

	componentDidMount() {
		const {location} = this.props;
		let category = location.pathname;
		this.props.getPosts(category);
	}

	render() {



		/*const date = new Date(1528737694553);
		const options = { year:'numeric', month:'long', day:'numeric', hour12: true, hour: '2-digit', minute: '2-digit' };
		const formattedDate = date.toLocaleDateString("en-CA", options);*/

		return (
			<div className="container">

				<h1>This is PostList.js</h1>
			</div>
		);
	}
}


function mapStateToProps ({posts}) {
	return {
		posts: posts.byId
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getPosts: (data) => dispatch(postsOperations.fetchPosts(data))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList))


