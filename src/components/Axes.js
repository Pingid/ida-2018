import React from 'react'
import styled from 'styled-components';

const XCross = styled.div`
	position: relative;
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
	position: relative;
	top: .4rem;
	height: 0;
	flex: 1 1 100%;
	border: 1px dashed black;
`
const Text = styled.div`
	text-transform: uppercase;
	padding: 0 .5rem;
	white-space: nowrap;
`
const Center = styled.div`
	position: absolute;
	margin-left: 50%;
	height: 0;
	border: .5rem solid blue;
	background: blue;
`;

export default () => {
	return (
		<div className="px3 absolute border-box w100 h100 flex flex-column justify-center items-center">
			<div className="absolute w100 h100 flex justify-center items-center">
				<XCross>
					<Text>Fiction</Text>
					<DashLine />
					<Text>Reality</Text>
				</XCross>
			</div>
			<div className="absolute w100 h100 flex justify-center items-center">
				<YCross>
					<Text>Outcome-led</Text>
					<DashLine />
					<Text>process-led</Text>
				</YCross>
			</div>
		</div>
	)
}