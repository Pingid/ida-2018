import React from 'react';
import Link from 'gatsby-link';
import Image from 'gatsby-image';
import styled from 'styled-components';

const Menu = styled.div`
	position: fixed;
	left: ${({ open }) => open ? 0 : -15}rem;
	width: 15rem;
	height: 100vh;
	transition: .2s left;
	background: rgba(255,255,255, 1);
	overflow-y: scroll;
`;

export default class Mobile extends React.Component {
	render() {
		const { projects, projectStills } = this.props; 
		const projectsWithImage = projects.map(x => Object.assign({}, x, {
			still: projectStills.filter(y => {
				return new RegExp(x.slug + '-\\w{10}', 'gi').test(y.resolutions.src)
			})[0]
		}))

		return (
			<div>
	      <div className="w100 border-box">
	      	<div className="p2 pt2 pb0">
		        <h1 className="m0 c-orange">Liminal</h1>
			      <h2 className="m0 py1 c-grey black" style={{ maxWidth: '20rem' }}>IDA graduation show</h2>
						<p className="m0 black pt2" style={{ maxWidth: '20rem' }}>
							Interaction Design Arts is a multidisciplinary course, where students are encouraged to work across a variety of media from digital to analogue on a range of different personal and non-personal subjects. This course is perfect for those who wish to not put themselves in specific brackets as practitioners.
                <br/>
                <br/>
                It is this fluidity of IDA that the class of 2018 wishes to embrace in the show 'Liminal'. The works exhibited exist at the border of art and design, combining several introspective and extraspective voices.
						</p>
					</div>
					<div className="">
						<div className="">
							<div className="border-box px2 pb4">
								{ projectsWithImage.map(x => (
									<Link key={x.slug} to={'/project/' + x.slug} className="wfit text-decoration-none">
										<div className="relative" style={{ zIndex: 11 }}>
											<h4 className="m0 c-orange caps pt2">{x.projectName.toLowerCase()}</h4>
											<p className="m0 pb1">{x.yourName.toLowerCase()}</p>
										</div>
										<div className="mb2">
											{ x.still && <Image style={{ width: 'calc(100vw - 2rem)', height: 'calc((100vw - 2rem) / 1.5)' }} className="mobile-image" resolutions={x.still.resolutions} /> }
											{ !x.still && <div className="wfit cb-grey" style={{ height: '3rem'}}/>}
										</div>
									</Link>
									))
								}
							</div>
						</div>
					</div>
	      </div>
			</div>
		)
	}
}