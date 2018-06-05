import React from 'react';
import Project from './Project';
import { Link } from 'react-router-dom';

export default ({ projects, match }) => {
	let current, previus, next;
	for (let i = 0; i < projects.length; i++) {
		if (projects[i].slug === match.params.slug) {
			previus = projects[i === 0 ? (projects.length - 1) : (i - 1) % projects.length];
			current = projects[i];
			next = projects[(i + 1) % projects.length];
		}
	}

	return (
		<div>
			<Project info={current} />
			<Link to={`/project/${next.slug}`}><h1>Next</h1></Link>
			<Link to={`/project/${previus.slug}`}><h1>Previus</h1></Link>
		</div>
	);
}