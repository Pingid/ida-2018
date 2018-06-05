import React from 'react';

export default ({ info }) => {
	return (
		<div>
			<h1>{info.projectName}</h1>
			<p>By: {info.yourName}</p>
			<br />
			<p>{info['100WordDescription']}</p>
		</div>
	)
}