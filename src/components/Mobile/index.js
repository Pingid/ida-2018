import React from 'react';
import Link from 'gatsby-link';
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
	state = { menuOpen: false }
	render() {
		const { menuOpen } = this.state; 
		const { projects } = this.props; 
		return (
			<div>
				{
					// <Menu open={menuOpen}>
					// 	<div className="border-box pl2 pt4">
					// 		{ projects.map(x => (
					// 			<Link to={'/project/' + x.slug} className="text-decoration-none">
					// 				<div className="py2 pr2">
					// 					<h4 className="c-orange m0">{x.projectName.toLowerCase()}</h4>
					// 					<p className="m0 c-grey">{x.yourName.toLowerCase()}</p>
					// 				</div>
					// 			</Link>
					// 			))
					// 		}
					// 	</div>
					// </Menu>

					// <div className="fixed wfit flex justify-between" style={{ height: '2rem', top: 0 }}>
		   //      <h4 className="m0 p2" onClick={() => this.setState({ menuOpen: !menuOpen })}>menu</h4>
		   //    </div>
	      }
				
			  
	      <div className="w100 border-box">
	      	<div className="cb-orange p2 pt2 pb3">
		        <h1 className="m0 white">Liminal</h1>
			      <h2 className="m0 black" style={{ maxWidth: '20rem' }}>Interaction Design Arts 2018 Graduate Degree Show</h2>
						<p className="m0 white pt2" style={{ maxWidth: '20rem' }}>
							In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content. Replacing the actual content with placeholder text allows designers to design the form of the content before the content itself has been produced.
						</p>
					</div>
					<div>
						<h2 className="pl2 pt3 pb1 m0">projects</h2>
						<div className="border-box flex flex-wrap px2">
							{ projects.map(x => (
								<Link to={'/project/' + x.slug} className="text-decoration-none" style={{ flex: '1 1 8rem'}}>
									<div className="py2 pr2">
										<h4 className="c-orange m0">{x.projectName.toLowerCase()}</h4>
										<p className="m0 c-grey">{x.yourName.toLowerCase()}</p>
									</div>
								</Link>
								))
							}
						</div>
					</div>
	      </div>
			</div>
		)
	}
}