import React, { Component } from 'react';
import uuid from 'uuid/v4';
import './NewPost.css';


/*

new posts need to gather:
{
	id: uuid,
	timestamp: Date.now(),
	title: string,
	body: string,
	author: string,
	category: catList
}
 */


class NewPost extends Component {
	state = {
		values: {
			title: '',
			body: '',
			author: '',
			category: 'select category'
		},
		errors: {
			title: '',
			body: '',
			author: '',
			category: 'select category'
		},
		isSubmitting: false,

	}

	handleChange = (e) => {
		const target = e.target;
		const name = target.name;
		const value = target.value;
		this.validateForm();
		this.setState(
			{
				values: {
					...this.state.values,
					[name]: value
				}
			})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.validateForm()){
			this.setState({isSubmitting: true})
			console.log('form passed validation');
		} else {
			console.log('form did not pass validation');
		}

	}

	validateForm = () => {
		let values = this.state.values;
		let errors = {};
		let formIsValid = true;
		let namePattern = /^[A-Z]?[A-Za-z.'\- ]{1,50}$/;

		if (values.title.trim() === ''){
			formIsValid = false;
			errors.title = "Please enter a Title";
		}
		if (values.body.trim() === ''){
			formIsValid = false;
			errors.body = "Please add content to the post before submitting";
		}
		if (values.author.trim() === ''){
			formIsValid = false;
			errors.author = "Name field cannot be empty!"
		} else if (!namePattern.test(values.author)){
			formIsValid = false;
			errors.author = "Please enter a valid name with no numbers or symbols"
		}
		if (values.category === 'select category'){
			formIsValid = false;
			errors.category = 'Please choose a category'
		}
		this.setState({errors});
		return formIsValid;
	}

	render() {
		const onClose = this.props.onClose;
		const errors = this.state.errors;
		const isSubmitting = this.state.isSubmitting;
		return (
			<section className="new-post container">
				<h2>Add New Post</h2>

				<form className="post-form" onSubmit={this.handleSubmit}>

						<p>
							<input
								type="text"
								className={'title' + (errors.title ? ' error': '')}
								name="title"
								value={this.state.values.title}
								placeholder="Enter Title"
								onChange={this.handleChange}  />
								{errors.title && <span className='errmsg'>{errors.title}</span>}
						</p>
						<p>
							<textarea
								className={'body' + (errors.body ? ' error': '')}
								name="body"
								value={this.state.body}
								onChange={this.handleChange}
								rows="20"
								placeholder="Enter post content here.." />
							<span className='errmsg'>{errors.body}</span>
						</p>

					<div className="name-category">
						<input
							className={'author' + (errors.author ? ' error': '')}
							type="text"
							name="author"
							value={this.state.values.author}
							placeholder="Name (required)"
							onChange={this.handleChange}
							/>
							<span className='errmsg'>{errors.author}</span>

						<select
							className={'category' + (errors.author ? ' error': '')}
							name="category"
							value={this.state.values.category}
							onChange={ this.handleChange }
							>
							<option value="select category" disabled >select category</option>
							<option value="react">react</option>
							<option value="redux">redux</option>
							<option value="udacity">udacity</option>
						</select>
						<span className='errmsg'>{errors.category}</span>

					</div>

					<div className="form-buttons">
						<button type="button" className="ripple" onClick={onClose}>Cancel</button>
						<button type="submint" className="ripple" disabled={isSubmitting} >Submit</button>
					</div>

				</form>
			</section>


		);
	}
}

export default NewPost;












































