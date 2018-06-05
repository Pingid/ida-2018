import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Tile = styled.div`
	flex: 0 0 25%;
	height: 6rem;
	background: lightgrey;
`;

export default ({ projects }) => {
	console.log('render')
	return (
		<div className="flex justify-center items-center">
			<div className="flex flex-wrap" style={{ margin: '0 auto', maxWidth: '50rem' }}>
				{ projects.map(x => (
						<Tile key={x.slug}>
							<Link to={`/project/${x.slug}`}>
								<p className="center">{x.projectName}</p>
							</Link>
						</Tile>
					))
				}
			</div>
		</div>
	);
}