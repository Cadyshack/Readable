import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from 'react-s-alert';

const EditPost = ({ title, body, id, onClose, editPost }) => {
	return (
		<section className="edit-post container">
			<Formik
				initialValues={{
					title,
					body,
				}}
				validationSchema={Yup.object().shape({
					title: Yup.string().required('Please enter a title'),
					body: Yup.string().required('Please add content to the post before submitting'),
				})}
				onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
					let postEdit = { ...values }
					let jsonPostEdit = JSON.stringify(postEdit);
					editPost( id, jsonPostEdit);

					Alert.success('Post Edited Successfully!', {
						position: 'top-right',
						effect: 'slide',
						timeout: 1500,
					});
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
						<div className="form-buttons">
							<button type="button" className="ripple" onClick={onClose}>Cancel</button>
							<button
							 type="submit"
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

export default EditPost;