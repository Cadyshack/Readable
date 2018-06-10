import React, { Component } from 'react';
//import PropTypes from 'prop-types';

class PostList extends Component {

	componentDidMount() {

	}


	render() {
		//let match = this.props.match;

		return (
			<div>
				<h1>This is PostList.js</h1>
				<p>{this.props.match.url}</p>
			</div>
		);
	}
}

export default PostList;

