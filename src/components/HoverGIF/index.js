import React from 'react';
import { navigateTo } from 'gatsby-link';
import LazyGif from '../LazyGif';

export default ({ selected, gif, preload }) => {
	const gifSRC = require(`../../imgs/optimised-200/${gif}`) || null;
	return (
		<div
			onClick={() => navigateTo('project/' + selected + '?animate')}
			className="absolute"
			style={{
				top: '2.5vw',
				left: '2.5vw',
				zIndex: 0,
				width: '95vw',
				height: 'calc(100vh - 5vw)',
			}}>
			<LazyGif preload={preload.resolutions.base64} gif={gifSRC} />
		</div>
	)
}