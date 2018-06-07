import React from 'react';
import { Link } from 'react-router-dom';
import { Motion, spring } from 'react-motion';

export default class HoverImage extends React.Component {
	constructor() {
		super();
		this.state = { size: 150, mouse: { x: 0, y: 0 }};

		this.handleMousePos = this.handleMousePos.bind(this)
	}
	componentDidMount() {
		this.setState({ size: 210 })
		window.addEventListener('mousemove', this.handleMousePos);
	}
	componentWillUnmount() {
		window.removeEventListener('mousemove', this.handleMousePos)
	}
	handleMousePos(e) {
		this.setState({ mouse: { x: e.clientX, y: e.clientY }});
	}
	render() {
		const { selected } = this.props;
		const { size, mouse } = this.state;
		return selected ? (
			<div className="fixed w100 h100" style={{ 
				top: 0, 
				left: 0, 
				cursor: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQYV2P4//8/IwAI/QL/+TZZdwAAAABJRU5ErkJggg=='), url(images/blank.cur), none !important` }}>
				<Motion defaultStyle={{ x: 100 }} style={{ x: spring(0)}}>
				{({ x }) => (
					<div
						className="fixed center border-box flex items-center justify-center"
						style={{
								// background: 'rgba(255, 255, 255, 0.11)',
							top: 0, 
							left: 0,
							cursor: 'none',
							zindex: 10,
							width: size - x,
							height: size - x,
							// background: 'black',
							border: '1px solid white',
							borderRadius: '50%',
							color: 'black',
							transform: `translate(${mouse.x - (size - x) / 2}px, ${mouse.y - (size - x) / 2}px)` }}>
							<div className="border-box p3 flex items-center justify-center" style={{
								background: 'rgba(255, 255, 255, 0.11)',
								flex: `0 0 ${size}px`,
								color: 'white',
								width: size,
								height: size,
								clipPath: `circle(${(size / 2 - 5) - (x / 2)}px at center)`
							}}>
								<Link className="nocursor" to={`/project/${selected.slug}`}>
									<h3 className="nocursor m0">{selected.projectName}</h3>
									{ /* <p>By: {selected.yourName}</p> */ }
								</Link>
							</div>
				</div>
				)}
				</Motion>
			</div>
		) : null;
	}
}