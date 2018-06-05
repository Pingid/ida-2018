import React from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';
import { dist } from '../utils/vecter';

const Wrapper = styled.div`
	position: absolute;
	width: 4px;
	height: 4px;
	border-radius: 50%;
	background: black;
	left: ${x => x.pos.x}px;
	top: ${x => x.pos.y}px;
	// transform: translate(${x => x.pos.x}px, ${x => x.pos.y}px)
`

export default ({ pos, mouse }) => {
	let point = dist(pos, mouse) < 50 ? mouse : pos;
	return (
		<Motion defualtStyle={{ x: window.innerWidth / 2, y: window.innerHeight / 2 }} style={{ x: spring(point.x), y: spring(point.y)}}>
			{ x => (
				<Wrapper pos={x}>
				</Wrapper>
				)
			}
		</Motion>
	)
}