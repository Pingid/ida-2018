import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import LazyGif from '../components/LazyGif';
import MountTrigger from '../components/MountTrigger';
import ScrollGallery from '../components/ScrollGallery';

import '../style/project.css';

export default ({ pathContext, history, match, location }) => {
	let preloadSRC = '', gifSRC = '';
	if (pathContext.hasGif) {
		preloadSRC = require(`../imgs/frame-200/${pathContext.slug}.png`) || null;
		gifSRC = require(`../imgs/gifs/${pathContext.slug}.gif`) || null;
	}
	const animate = location.search === '?animate';
	const go = animate ? setTimeout(() => history.replace(location.pathname), 300) : null;
	return (
		<div>
			<MountTrigger animate={animate}>
				{ (mounted) => (
					<div>
						<div className={classNames('title', { [`title-active`]: mounted })}><div>{pathContext.projectName}</div></div>
						<div className={classNames('gif-wrapper', { ['gif-wrapper-closed']: mounted } )}>
							<LazyGif preload={preloadSRC} gif={gifSRC} />
						</div>
					</div>
				)} 
			</MountTrigger>
			<div style={{ margin: '0 auto', padding: '2.5vw', maxWidth: '40rem' }}>
				<p>{pathContext['projectType/materials']}</p>
				<div className="flex">
					<h4 className="right-align mt1 pr2">{pathContext.yourName}</h4>
					<p className="mt1">{pathContext.wordDescription}</p>
				</div>
			</div>
			<div>
				{ pathContext.images.length > 0 && (
					<ScrollGallery images={pathContext.images.map(img => require(`../imgs/project-images/${img}`))} />
				)}
			</div>
		</div>
	)
}