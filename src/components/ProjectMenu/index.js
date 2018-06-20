import React from 'react';
import MountTrigger from '../MountTrigger';
import classNames from 'classnames';
import Link from 'gatsby-link';
import styled from 'styled-components';

import ProjectsGrid from '../ProjectsGrid';
import GridIcon from '../GridIcon';

const DropDown = styled.div`
	position: fixed;
	overflow-y: scroll;
	width: 100%;
	height: 100vh;
	top: ${({ open }) => open ? 0 : -120}vh;
	background: white;
	z-index: 15;
	transition: .3s top;
	padding-top: 5rem;
	padding-bottom: 5rem;
	box-sizing: border-box;
`;

export default class ProjectMenu extends React.Component {
	constructor() {
		super();
		this.state = { menuOpen: false }
	}
	render() {
		const { menuOpen } = this.state;
		const { animate, projects } = this.props;

		return (
			<MountTrigger animate={animate} delay={300}>
			 { (delayed) => (
			 		<div>
			 			<DropDown open={menuOpen}>
			 				<ProjectsGrid projects={projects} />
			 			</DropDown>
						<div className="fixed topleft cb-white wfit flex justify-between items-center" style={{ height: '3rem', zIndex: 17 }}>
							<Link to="/" style={{ width: 0 }}>
								<h4 style={{ paddingLeft: '2.5vw' }} className={classNames("m0 caps left pt1 c-orange", { hide: !delayed, show: delayed })}>
									Liminal
								</h4>
							</Link>
							<h4 style={{ width: '1.7rem' }} onClick={() => this.setState({ menuOpen: !menuOpen })} className={classNames("m0 caps center pt1 c-orange", { hide: !delayed, show: delayed })}>
								<GridIcon open={menuOpen}/>
							</h4>
							<h4 style={{ paddingRight: '2.5vw'}} className={classNames("m0 caps align-right pt1", { hide: !delayed, show: delayed })}>
							</h4>
						</div>
					</div>
			 	)}
			</MountTrigger>
		)
	}
}