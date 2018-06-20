import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

export default ({ projects }) => {
	return (
		<div className="flex flex-wrap border-box justify-between px2" style={{ margin: '0 auto', maxWidth: '50rem' }}>
				{ projects.map(pr => (
					<div key={pr.slug} className="border-box p1 mb2" style={{ flex: '0 0 11rem' }}>
						<Link to={'/project/' + pr.slug} style={{ textDecoration: 'none' }}>
							<h3 className="c-orange left wfit m0" style={{ }}>{pr.projectName.toLowerCase()}</h3>
							<p className="m0">by: {pr.yourName}</p>
						</Link>
					</div>
				))
			}
		</div>
	);
}