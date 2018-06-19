import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import uuid from 'uuid/v4';
import Alert from 'react-s-alert';

import './NewPost.css';


const NewPost = ({onClose, categories, addPost }) => {
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
					let id = uuid();
					let timestamp = Date.now();
					let post = {
						...values,
						id,
						timestamp
					}
					let jsonPost = JSON.stringify(post)
					addPost(jsonPost);
					Alert.success('Post Added Successfully!', {
						position: 'top-right',
						effect: 'slide',
						timeout: 1500,
					})
					resetForm();
					onClose();
				}}
				render={({ errors, touched, isSubmitting }) => (
					<Form>

						<Field
							type='text'
							name='title'
							className={errors.title && touched.title ? 'title error' : 'title'}
							placeholder="Enter Title"
						/>
						{errors.title && touched.title && <span className='errmsg'>{errors.title}</span>}


						<Field
							component='textarea'
							name='body'
							rows='20'
							className={errors.body && touched.body ? 'body error': 'body'}
							placeholder='Enter post content here..'
						/>
						{errors.body && touched.body && <span className='errmsg'>{errors.body}</span>}

						<div className="name-category">
							<div>
								<Field
									type='text'
									name='author'
									className={errors.author && touched.author ? 'author error' : 'author'}
									placeholder='Name (required)'
								/>
								{errors.author && touched.author && <p className='errmsg'>{errors.author}</p>}
							</div>
							<div>
								<Field
									component='select'
									name='category'
									className={errors.category && touched.category ? 'category error' : 'category' }
									>
									<option value="select category" disabled >select category</option>
									{categories.map(cat => (
										<option key={cat} value={cat}>{cat}</option>
									))}
								</Field>
								{errors.category && touched.category && <p className='errmsg'>{errors.category}</p>}
							</div>
						</div>
						<div className="form-buttons">
							<button type="button" className="ripple" onClick={onClose}>Cancel</button>
							<button
							 type="submint"
							 className="ripple"
							 disabled={isSubmitting}
							 >Submit</button>
						</div>
					</Form>
				)}
			/>

		</section>
	)
}


export default NewPost;












































