import React from 'react';
import Dot from './Dot';

const dots = new Array(30).fill(0).map((x, _) => ({
	x: Math.random() * window.innerWidth,
	y: Math.random() * window.innerHeight
}))

export default class Spread extends React.Component {
	state = { mouse: { x: 0, y: 0 } }
	componentDidMount() {
		window.addEventListener('mousemove', this.handleMouseMove.bind(this))
	}
	componentWillUnmount() {
		window.removeEventListener('mousemove', this.handleMouseMove.bind(this));
	}
	handleMouseMove(e) {
		this.setState({ mouse: { x: e.clientX, y: e.clientY } });
	}
	render() {
		const { mouse } = this.state;
		return (
			<div className="absolute wfit h100">
				{ dots.map((d, i) => <Dot key={i} pos={d} mouse={mouse} />) }
			</div>
		)
	}
}
