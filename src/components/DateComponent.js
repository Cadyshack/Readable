import React from 'react';

const DateComponent = (props) => {
	const timestamp = props.timestamp;
	let options = props.options;
	if (!options) {
		options = { year:'numeric', month:'long', day:'numeric' };
	}
	let date = new Date(timestamp);
	let formattedDate = date.toLocaleDateString("en-CA", options);

	return (
		<span className="date-info">{formattedDate}</span>
	)
}

export default DateComponent;