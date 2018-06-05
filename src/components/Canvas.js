import React from 'react';
import P5 from 'react-p5-wrapper';

import dotSketch from '../utils/dotSketch';

export default class Canvas extends React.Component {
	constructor() {
		super();
		this.state = { selected: null };

		this.handleResize = this.handleResize.bind(this);
	}
	componentDidMount() {
		window.addEventListener('resize', this.handleResize)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}
	shouldComponentUpdate(props, state) {
		if (this.props.projects.length !== props.projects.length) return true;
		return false;
	}
	handleResize() { this.forceUpdate() }
	render() {
		const { projects, select } = this.props;

		const marginX = 100;
		const marginY = 100;
		const width = window.innerWidth;
		const height = window.innerHeight;

		return (
			<div className="absolute w100 h100 border-box" style={{ zIndex: -2, top: 0, left: 0 }}>
				<P5 projects={projects} sketch={p => dotSketch({
					p,
					width, 
					height, 
					marginX, 
					marginY,
					select,
					color: '#000000' 
				})} />
			</div>
		)
	}
}