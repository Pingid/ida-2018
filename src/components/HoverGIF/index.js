import React from 'react';
import classNames from 'classnames';
import { navigateTo } from 'gatsby-link';
import LazyGif from '../LazyGif';

export default ({ selected, gif, preload }) => {
	const goTo = () => selected ? navigateTo('project/' + selected + '?animate') : null;
	if (!preload) return (
		<div
			onClick={goTo}
			className={classNames('absolute', { ['cb-orange']: selected })}
			style={{ top: '2.5vw', left: '2.5vw', zIndex: 0, width: '95vw', height: 'calc(100vh - 5vw)' }}>
		</div>
	)
	const gifsrc = require(`../../imgs/optimised/${gif}`) || null;
	return (
		<div
			onClick={goTo}
			className="absolute cb-grey"
			style={{
				top: '2.5vw',
				left: '2.5vw',
				zIndex: 0,
				width: '95vw',
				height: 'calc(100vh - 5vw)',
			}}>
			<LazyGif preload={preload.resolutions.src} gif={gifsrc} />
		</div>
	)
}