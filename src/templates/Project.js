import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import Img from 'gatsby-image';
import Link from 'gatsby-link';

import ProjectMenu from '../components/ProjectMenu';
import ProjectHeader from '../components/ProjectHeader';

const Footer = styled.div`
	position: fixed;
	height: 50vh;
	bottom: calc(-50vh + 2.5vw);
	width: 100%;
	transition: .3s bottom;
	z-index: 10;
	&:hover {
		bottom: 0vh;
	}
`;

export default ({ data, pathContext, history, match, location }) => {
	const selected = pathContext.slug;

	const images = data.projectImages.edges
		.map(x => x.node.childImageSharp)
		.filter(x => x)
		.filter(x => new RegExp('\/static\/' + pathContext.slug).test(x.sizes.src));

	const gifImages = data.gifImages.edges
    .map(x => x.node.childImageSharp)
    .filter(x => x);
  const selectedGifImage = gifImages.filter(x => new RegExp('\/static\/' + selected, 'gi').test(x.resolutions.src))[0] || null;

  const gifs = data.gifs.edges
    .map(x => x.node.base);
  const selectedGif = gifs.filter(x => x.replace('.gif', '') === selected)[0] || null;

  let gifsrc = '';
  if (selectedGif) {
  	gifsrc = require(`../imgs/optimised/${selectedGif}`) || null;
  }

	const animate = location.search === '?animate';
	const go = animate ? setTimeout(() => history.replace(location.pathname), 300) : null;
	
	const description = (pathContext.unlimitedDescription && pathContext.unlimitedDescription.length > 10) ? 
		pathContext.unlimitedDescription : pathContext.wordDescription;
	const formated = description.split('\n').map((x, i) => <p key={i} className="mt0">{x}</p>)

	const projects = data.projects.edges.map(x => x.node).filter(x => x.slug);

	return (
		<div>
			<ProjectMenu animate={animate} projects={projects} />
			<ProjectHeader 
				animate={animate} 
				project={Object.assign({}, pathContext, { gif: gifsrc, src: (selectedGifImage && selectedGifImage.resolutions.src), preload: (selectedGifImage && selectedGifImage.resolutions.base64) })} />
			<div style={{ margin: '0 auto', padding: '0 2.5vw', maxWidth: '40rem' }}>
				<p className="c-grey">{pathContext['projectType/materials']}</p>
				<div className="flex">
					<h4 className="right-align mt1 pr2">{pathContext.yourName}</h4>
					<div className="mt1">{formated}</div>
				</div>
				{ 
					images.map(x => 
						<Img
							style={{ width: '100%', marginBottom: '1rem' }}
							key={x.sizes.src} 
							sizes={x.sizes} />
					)
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
              resolutions(width: 200) {
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
    projectImages: allFile(filter: { relativeDirectory: { eq: "project-images" } }) {
	    edges {
	      node {
	        childImageSharp {
	          ... on ImageSharp {
	            sizes(maxWidth: 700) {
	              base64
	              aspectRatio
	              src
	              srcSet
	              sizes
	              originalImg
	            }
	          }
	        }
	      }
	    }
	  }
	  projects: allDataJson {
      edges {
        node {
          slug
          coordinates {
            x
            y
          }
          yourName
          hasGif
          projectName
          videoLink
        }
      }
    }
  }
`;
