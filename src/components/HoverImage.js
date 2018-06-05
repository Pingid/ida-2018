import React from 'react';

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

		return (
			<div className="fixed">
				{ selected && (
					<div style={{ transform: `translate(${mouse.x - 100}px, ${mouse.y}px)` }}>
						<h1>{selected.yourName}</h1>
					</div>
				)}
			</div>
		);
	}
}