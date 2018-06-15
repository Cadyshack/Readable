import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
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

const NewPost = ({onClose}) => {
	return (
		<section className="new-post container">
			<h2>Add New Post</h2>
			<Formik
				initialValues={{
					title: '',
					body: '',
					author: '',
					category: 'select category'
				}}
				validationSchema={Yup.object().shape({
					title: Yup.string().required('Please enter a title'),
					body: Yup.string().required('Please add content to the post before submitting'),
					author: Yup.string().required('Name field cannot be empty!').matches( /^[A-Z]?[A-Za-z.'\- ]{1,50}$/, "Please enter a valid name with no numbers or symbols" , {excludeEmptyString: true}),
					category: Yup.mixed().notOneOf(['select category'], 'Please choose a category')
				})}
				onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
					console.log(values);
					setSubmitting(false);
				}}
				render={({ errors, touched, isSubmitting }) => (
					<Form>
						<p>
							<Field
								type='text'
								name='title'
								className={`title ${errors.title && touched.title && 'error'}`}
								placeholder="Enter Title"
							/>
							{errors.title && touched.title && <span className='errmsg'>{errors.title}</span>}
						</p>
						<p>
							<Field
								component='textarea'
								name='body'
								rows='20'
								className={`body ${errors.body && touched.body && 'error'}`}
								placeholder='Enter post content here..'
							/>
							{errors.body && touched.body && <span className='errmsg'>{errors.body}</span>}
						</p>
						<div className="name-category">
							<div>
								<Field
									type='text'
									name='author'
									className={`author ${errors.author && touched.author && 'error'}`}
									placeholder='Name (required)'
								/>
								{errors.author && touched.author && <p className='errmsg'>{errors.author}</p>}
							</div>
							<div>
								<Field
									component='select'
									name='category'
									className={`category ${errors.category && touched.category && 'error'}`}
									>
									<option value="select category" disabled >select category</option>
									<option value="react">react</option>
									<option value="redux">redux</option>
									<option value="udacity">udacity</option>
								</Field>
								{errors.category && touched.category && <p className='errmsg'>{errors.category}</p>}
							</div>
						</div>
						<div className="form-buttons">
							<button type="button" className="ripple" onClick={onClose}>Cancel</button>
							<button type="submint" className="ripple" disabled={isSubmitting}>Submit</button>
						</div>
					</Form>
				)}
			/>
		</section>
	)
}


export default NewPost;












































