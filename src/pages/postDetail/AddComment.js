import React, {Component} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import uuid from 'uuid/v4';
import Alert from 'react-s-alert';
import PropTypes from 'prop-types';

import './AddComment.css';

class AddComment extends Component {

	static propTypes = {
		parentId: PropTypes.string.isRequired,
		addComment: PropTypes.func.isRequired
	}
	state = {
		addCommentActive: false
	}

	handleFocus = () => {
		this.setState({addCommentActive: true})
	}
	hideForm = (e) => {
		this.setState({addCommentActive: false})
	}

	render() {
		const {parentId, addComment } = this.props;
		return (
			<div className='add-comment' >
				<h2>Leave a Comment</h2>
				<Formik
					initialValues={{
						author: '',
						body: '',
					}}
					validationSchema={Yup.object().shape({
						author: Yup.string().required('Name field cannot be empty!'),
						body: Yup.string().required('Please add content before submitting a comment'),
					})}
					onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
						let id = uuid();
						let timestamp = Date.now();
						let comment = {
							...values,
							id,
							timestamp,
							parentId
						}
						let jsonComment = JSON.stringify(comment);
						addComment(jsonComment);
						Alert.success('Comment Added Successfully!', {
							position: 'top-right',
							effect: 'slide',
							timeout: 1500,
						});
						resetForm();
					}}
					onReset={(values, { setSubmitting, resetForm, setErrors }) =>{
						resetForm();
						this.hideForm();
					}}
					render={({ errors, touched, isSubmitting, handleReset }) => (

						<Form className={this.state.addCommentActive ? 'open' : 'close'}>
							<Field
								component='textarea'
								name='body'
								className={errors.body && touched.body ? 'body error': 'body'}
								placeholder='Enter your comment here..'
								onFocus={this.handleFocus}
							/>
							{errors.body && touched.body && <span className='errmsg'>{errors.body}</span>}
						<div className='bottom-row'>
							<div>
								<Field
									type='text'
									name='author'
									className={errors.author && touched.author ? 'author error' : 'author'}
									placeholder="Name (required)"
								/>
								{errors.author && touched.author && <span className='errmsg'>{errors.author}</span>}
							</div>

							<div className="form-buttons">
								<button type="reset" className="ripple" onClick={handleReset}>Cancel</button>
								<button
								 type="submit"
								 className="ripple"
								 disabled={isSubmitting}
								 >Post Comment</button>
							</div>
						</div>
						</Form>
					)}
				/>

			</div>
		)

	}
}



export default AddComment;

























