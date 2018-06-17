import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import LazyGif from '../components/LazyGif';
import MountTrigger from '../components/MountTrigger';
import ScrollGallery from '../components/ScrollGallery';

import '../style/project.css';

export default ({ data, pathContext, history, match, location }) => {
	const selected = pathContext.slug;

	const images = data.allImageSharp.edges
		.map(x => x.node.sizes)
		.filter(x => new RegExp(pathContext.slug).test(x.originalName))

	const gifImages = data.gifImages.edges
    .map(x => x.node.childImageSharp);
  const selectedGifImage = gifImages.filter(x => new RegExp(selected).test(x.resolutions.src))[0] || null;

  const gifs = data.gifs.edges
    .map(x => x.node.base);
  const selectedGif = gifs.filter(x => new RegExp(selected).test(x))[0] || null;

	let gifSRC = '';
	if (pathContext.hasGif) {
		gifSRC = require(`../imgs/optimised/${pathContext.slug}.gif`) || null;
	}

	const animate = location.search === '?animate';
	const go = animate ? setTimeout(() => history.replace(location.pathname), 300) : null;
	
	return (
		<div>
			<MountTrigger animate={animate}>
				{ (mounted) => (
					<div>
						<div className={classNames('title', { [`title-active`]: mounted, black: gifSRC.length < 1 })}><div>{pathContext.projectName}</div></div>
						<div className={classNames('gif-wrapper', { ['gif-wrapper-closed']: mounted } )}>
							<LazyGif preload={selectedGifImage.resolutions.base64} gif={gifSRC} />
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
  	gifs: allFile(filter: { relativeDirectory: { eq: "optimised" } }) {
      edges {
        node {
          base
        }
      }
    }
    gifImages: allFile(filter: { relativeDirectory: { eq: "gif-pic" } }) {
      edges {
        node {
          childImageSharp {
            ... on ImageSharp {
              resolutions(width: 1000) {
                base64
                aspectRatio
                width
                height
                src
                srcSet
              }
            }
          }
        }
      }
    }
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
