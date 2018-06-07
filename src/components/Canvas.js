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
		console.log('unmount')
		window.removeEventListener('resize', this.handleResize);
		if (this.p5) { this.p5.remove() }
	}
	shouldComponentUpdate(props, state) {
		if (this.props.projects.length !== props.projects.length) return true;
		return false;
	}
	handleResize() { 
		console.log('resize')
		this.forceUpdate() 
	}
	render() {
		const { projects, select } = this.props;

		const marginX = 200;
		const marginY = 200;
		const width = window.innerWidth;
		const height = window.innerHeight;

		return (
			<div className="absolute w100 h100 border-box" style={{ zIndex: -2, top: 0, left: 0 }}>
				<P5 
					projects={projects} 
					sketch={p => {
						this.p5 = p;
						return dotSketch({
							p,
							width, 
							height,
							marginX, 
							marginY,
							select,
							lineDistanceLimmit: window.innerWidth / 4,
							color: '#000000' 
					})}} />
			</div>
		)
	}
}