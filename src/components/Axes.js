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
	border: 1px dashed black;
`
const Text = styled.div`
	text-transform: uppercase;
	padding: .5rem;
	background: black;
	color: white;
`
const Square = styled.div`
	position: relative;
	width: calc(50vw);
	height: calc(50vh);
	background: black;
`

export default class Axes extends React.Component {
	shouldComponentUpdate(newprops, oldProps) { return false; }
	render() {

		return (
			<div className="absolute" style={{ zIndex: -5 }}>
				<div style={{background: 'white'}} className="absolute w100 h100 flex flex-wrap justify-between items-center">
					<Square style={{ top: -.5, left: -.5 }} />
					<Square style={{ top: -.5, left: .5 }} />
					<Square style={{ top: .5, left: -.5 }} />
					<Square style={{ top: .5, left: .5 }} />
				</div>
				<div className="absolute border-box w100 h100 flex justify-between items-center">
					<Text>Fiction</Text>
					<div className="h100 flex flex-column justify-between">
						<Text>Outcome-led</Text>
						<Text>process-led</Text>
					</div>
					<Text>Reality</Text>
				</div>
			</div>
		)
		// return (
		// 	<div className="px3 absolute border-box w100 h100 flex flex-column justify-center items-center">
		// 		<div className="absolute w100 h100 flex justify-center items-center">
		// 			<XCross>
		// 				<Text>Fiction</Text>
		// 				<DashLine />
		// 				<Text>Reality</Text>
		// 			</XCross>
		// 		</div>
		// 		<div className="absolute w100 h100 flex justify-center items-center">
		// 			<YCross>
		// 				<Text>Outcome-led</Text>
		// 				<DashLine />
		// 				<Text>process-led</Text>
		// 			</YCross>
		// 		</div>
		// 	</div>
		// )
	}
}