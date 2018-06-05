import React from 'react';
import { Link } from 'react-router-dom';

export default class HoverImage extends React.Component {
	constructor() {
		super();
		this.state = { mouse: { x: 0, y: 0 }};
	}
	componentDidMount() {
		window.addEventListener('mousemove', this.handleMousePos.bind(this));
	}
	componentWillDismount() {
		window.removeEventListener('mousemove', this.handleMousePos.bind(this))
	}
	handleMousePos(e) {
		this.setState({ mouse: { x: e.clientX, y: e.clientY }});
	}
	render() {
		const { selected } = this.props;
		const { mouse } = this.state;

		return selected ? (
			<div
				className="absolute center"
				style={{
					cursor: 'none',
					zindex: 1000,
					width: 200,
					transform: `translate(${mouse.x - 100}px, ${mouse.y - 40}px)` }}>
				<Link to={`/project/${selected.slug}`}>
						<h2>{selected.projectName}</h2>
						<p>By: {selected.yourName}</p>
				</Link>
			</div>
		) : null;
	}
}