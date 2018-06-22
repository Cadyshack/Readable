import React from 'react';
import './ErrorPage.css';

const ErrorPage = (props) => {
  return (
    <div className="container error-page">
    	<h1 className="error-message">404 Page not Found</h1>
    	{props.message && <p>{props.message}</p>}
    </div>
  )
}

export default ErrorPage;