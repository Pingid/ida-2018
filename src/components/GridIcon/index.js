import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
	cursor: pointer;
	stroke-width: 0;
	& rect {
		fill: rgba(255, 65, 4, 1);
		transition: .3s fill;
	}
	${({ open }) => open ? `
			rect:nth-child(2) { fill: white; }
			rect:nth-child(4) { fill: white; }
			rect:nth-child(6) { fill: white; }
			rect:nth-child(8) { fill: white; }
	` : `
		&:hover {
			rect:nth-child(1) { fill: white; }
			rect:nth-child(3) { fill: white; }
			rect:nth-child(7) { fill: white; }
			rect:nth-child(9) { fill: white; }
		}
	`}
`;

export default ({ open }) => {
	return (
		<SVG
			open={open}
			xmlns="http://www.w3.org/2000/svg" 
			viewBox="0 0 512 512"
			className="cf-orange">
			<rect width="149" height="128" rx="24" ry="24"/>
	    <rect x="181" width="149" height="128" rx="24" ry="24"/>
	    <rect x="363" width="149" height="128" rx="24" ry="24"/>
	    <rect y="160" width="149" height="128" rx="24" ry="24"/>
	    <rect x="181" y="160" width="149" height="128" rx="24" ry="24"/>
	    <rect x="363" y="160" width="149" height="128" rx="24" ry="24"/>
	    <rect y="320" width="149" height="128" rx="24" ry="24"/>
	    <rect x="181" y="320" width="149" height="128" rx="24" ry="24"/>
	    <rect x="363" y="320" width="149" height="128" rx="24" ry="24"/>
		</SVG>
	)
}