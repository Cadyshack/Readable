import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from 'react-s-alert';

const EditComment = ({ body, id, editComment, onClose }) => {

	return (
		<section className="edit-comment container">
			<Formik
				initialValues={{
					body,
				}}
				validationSchema={Yup.object().shape({
					body: Yup.string().required('You must have something to submit, otherwise cancel and simply delete the post')
				})}
				onSubmit={(values, { setSubmitting, resetForm, setErrors }) => {
					let timestamp = Date.now();
					let commentEdit = { ...values, timestamp }
					let jsonCommentEdit = JSON.stringify(commentEdit);
					editComment( id, jsonCommentEdit);

					Alert.success('Comment Edited Successfully!', {
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

export default EditComment;