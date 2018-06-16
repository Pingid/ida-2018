import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import LazyGif from '../components/LazyGif';
import MountTrigger from '../components/MountTrigger';
import ScrollGallery from '../components/ScrollGallery';

import '../style/project.css';

export default ({ data, pathContext, history, match, location }) => {
	const images = data.allImageSharp.edges
		.map(x => x.node.sizes)
		.filter(x => new RegExp(pathContext.slug).test(x.originalName))

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
				{ images.map(x => <img srcSet={x.srcSet} />)

				}
			</div>
			<div>
				{ 
					// pathContext.images.length > 0 && (
					// 	<ScrollGallery images={images} />
					// )
				}
			</div>
		</div>
	)
}

export const pageQuery = graphql`
  query ProjectQuery {
    allImageSharp(filter: { original: { src: { regex: "/jpg/" }}}) {
	    edges {
	      node {
	        sizes(maxWidth: 1000) {
	          originalName
	          srcSet
	          srcWebp
	        }
	      }
	    }
	  }
  }
`;
