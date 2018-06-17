import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

const Wedge = styled.div`
	background: green;
	width: 10rem;
	height: 10rem;
	float: left;
	transform: rotateZ(10deg);
`;

const Copy = styled.p`
	box-sizing: border-box;
	padding-top: 14rem;
	padding-left: 3rem;
	max-width: 37rem;
`

export default ({ projects }) => {
	return (
		<div style={{ margin: '0 auto', maxWidth: '50rem' }}>
			<div className="flex mt4 pt4">
				<h1 className="c-orange m0" style={{ width: '10rem' }}>Interaction Design Arts ></h1>
				<Copy>
					In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content. Replacing the actual content with placeholder text allows designers to design the form of the content before the content itself has been produced.
				</Copy>
			</div>
			<h1 className="c-orange center">projects</h1>
			<h1 className="c-orange center">|</h1>
			<div className="flex flex-wrap px4 justify-between">
				{ projects.map(pr => (
						<div key={pr.slug} className="border-box p1 pl2 mb2" style={{ flex: '0 0 25%' }}>
							<Link to={'/project/' + pr.slug} style={{ textDecoration: 'none', color: 'black' }}>
								<div className="flex justify-center">
									<h3 className="c-orange left wfit m0" style={{ maxWidth: '10rem' }}>{pr.projectName.toLowerCase()}</h3>
								</div>
								<p className="m0">by: {pr.yourName}</p>
							</Link>
						</div>
					))
				}
			</div>
			<div className="my4" />
		</div>
	)
}