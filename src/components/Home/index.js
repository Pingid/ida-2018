import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';


export default ({ projects }) => {
	return (
		<div className="" style={{ zIndex: 11, margin: '0 auto', maxWidth: '50rem' }}>
			<div className="flex">
				<h1 className="c-orange m0 p2" style={{ width: '10rem' }}>Interaction Design Arts ></h1>
				<p className="border-box" style={{ paddingTop: '14rem', paddingLeft: '3rem', maxWidth: '37rem' }} >
					In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content. Replacing the actual content with placeholder text allows designers to design the form of the content before the content itself has been produced.
				</p>
			</div>
			<h1 className="c-orange center">projects</h1>
			<h1 className="c-orange center">|</h1>
			<div className="flex flex-wrap justify-between border-box px2" style={{ margin: '0 auto', maxWidth: '45rem' }}>
				{ projects.map(pr => (
						<div key={pr.slug} className="border-box p1 pl2 mb2" style={{ flex: '0 0 25%' }}>
							<Link to={'/project/' + pr.slug} style={{ textDecoration: 'none' }}>
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