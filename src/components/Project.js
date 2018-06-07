import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	max-width: 35rem;
	margin: 0 auto;
`;

export default ({ info }) => {
	return (
		<div className="w100">
			<Wrapper>
				<h1>{info.projectName}</h1>
				<p>By: {info.yourName}</p>
				<br />
				<p>{info['100WordDescription']}</p>
			</Wrapper>
		</div>
	)
}