import React from 'react'
import styled from 'styled-components';

const XCross = styled.div`
	position: absolute;
	height: 0rem;
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 0 auto;
`
const YCross = XCross.extend`
	width: 100vh;
	maxWidth: 100vw;
	transform: rotateZ(-90deg);
	transform-origin: top center;
`
const DashLine = styled.div`
	position: absolute;
	height: 1rem;
	border: 1px dashed white;
`
const Text = styled.div`
	text-transform: uppercase;
	padding: .5rem;

	color: black;
`
const Square = styled.div`
	position: relative;
	width: calc(50vw);
	height: calc(50vh);
	background: transparent;
`

export default class Axes extends React.Component {
	render() {
		const { left, top, right, bottom } = this.props;
		return (
			<div className="absolute" style={{ pointerEvents: 'none', zIndex: 0, top: 0, left: 0 }}>
				<div className="absolute border-box w100 h100 flex justify-between items-center">
					<Text>{left}</Text>
					<div className="h100 flex flex-column justify-between center">
						<Text>{top}</Text>
						<Text>{bottom}</Text>
					</div>
					<Text>{right}</Text>
				</div>
			</div>
		)
	}
}