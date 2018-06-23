import React from 'react';

const DateComponent = (props) => {
	const timestamp = props.timestamp;
	let options = props.options;
	if (!options) {
		options = { year:'numeric', month:'long', day:'numeric' };
	}
	const date = new Date(timestamp).toLocaleDateString("en-CA", options);
	return (
		<span className="date-info">{date}</span>
	)
}

export default DateComponent;