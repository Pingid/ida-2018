import React from 'react';
import Link from 'gatsby-link';

export default ({ selected }) => {
	const gifSRC = require(`../../imgs/gifs/${selected}.gif`) || null;
	return (
		<Link to={'project/' + selected}>
			<div
				className="absolute"
				style={{
					top: '2.5vw',
					left: '2.5vw',
					zIndex: 0,
					backgroundImage: `url(${gifSRC})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
					width: '95vw',
					height: 'calc(100vh - 5vw)',
				}}>
			</div>
		</Link>
	)
}
