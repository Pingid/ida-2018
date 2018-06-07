import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default ({ projects }) => {
	return (
		<div className="" style={{ maxWidth: '40rem', margin: '0 auto' }}>
			{ projects.map(x => (
						<div key={x.slug}>
							<Link to={`/project/${x.slug}`}>
								<h1 className="">{x.projectName.toLowerCase()}</h1>
							</Link>
						</div>
					))
				}
		</div>
	);
}