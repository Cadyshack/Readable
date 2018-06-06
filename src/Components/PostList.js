import React, { Component } from 'react';
//import PropTypes from 'prop-types';

class PostList extends Component {



	render() {

		let category = this.props.category;

		return (
			<div>
				<h1>This is PostList.js</h1>
				<p>{category}</p>
			</div>
		);
	}
}

export default PostList;

