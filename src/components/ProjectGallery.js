import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';

import Axes from './Axes';
import Project from './Project';

export default class ProjectGaller extends React.Component {
	state = { offset: -100, navigated: true }
	componentWillReceiveProps(newProps) {
		this.setState({ navigated: true })
	}
	render() {
		const { projects, match } = this.props;
		const { offset, navigated } = this.state;

		let current, previus, next;
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].slug === match.params.slug) {
				previus = projects[i === 0 ? (projects.length - 1) : (i - 1) % projects.length];
				current = projects[i];
				next = projects[(i + 1) % projects.length];
			}
		}

		return (
			<div style={{ overflow: 'hidden' }}>
				<Link to="/"><div className="p1 caps">back</div></Link>
				<Motion defaultStyle={{ x: offset }} style={{ x: navigated ? offset : spring(offset) }}>
					{ ({ x }) => (
						<div className="flex" style={{ 
							width: '300vw', 
							overflow: 'hidden',
							marginLeft: `${x}vw` 
						}}>
							<div style={{ flex: '0 0 100vw' }}><Project info={previus} /></div>
							<div style={{ flex: '0 0 100vw' }}><Project info={current} /></div>
							<div style={{ flex: '0 0 100vw' }}><Project info={next} /></div>
						</div>
						)
					}
				</Motion>
				<div className="fixed flex items-center justify-center w100" style={{ pointerEvents: 'none', bottom: 0, left: 0 }}>
					<div className="flex justify-between wfit caps p1" style={{ cursor: 'pointer', pointerEvents: 'all' }}>
						<div onClick={() => this.handleNavigate.call(this, 0, previus.slug)}>Previus</div>
						<div onClick={() => this.handleNavigate.call(this, -200, next.slug)}>Next</div>
					</div>
				</div>
			</div>
		);
	}
	handleNavigate(n, slug) {
		const { history, location } = this.props;
		this.setState({ navigated: false, offset: n })
		
		setTimeout(() => {
			history.replace(`/project/${slug}`)
			this.setState({ offset: -100 })
		}, 400)
	}
}
