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
	color: #797676;
`
const Square = styled.div`
	position: relative;
	width: calc(50vw);
	height: calc(50vh);
	background: transparent;
`

const Title = styled.h1`
	color: ${({ active }) => active ? 'rgba(255, 65, 4, 1)' : 'rgba(255, 255, 255, .1)'};
	font-size: 20vw;
	margin: 0;
	transition: .2s;
`;

export default class Axes extends React.Component {
	render() {
		const { left, top, right, bottom } = this.props;
		return (
			<div className="absolute" style={{ pointerEvents: 'none', zIndex: 0, top: 0, left: 0 }}>
				<div className="absolute border-box w100 h100 flex justify-between items-center">
					<Text style={{ width: '20rem' }}>{left}</Text>
					<div className="h100 flex flex-column justify-between center" style={{ }}>
						<Text>{top}</Text>
						<Title active={bottom}>liminal</Title>
						<Text>{bottom}-</Text>
					</div>
					<Text style={{ width: '20rem', textAlign: 'right' }}>{right}</Text>
				</div>
			</div>
		)
	}
}