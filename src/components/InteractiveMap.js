import React from 'react';

import Axes from './Axes';
import Canvas from './Canvas';
import HoverImage from './HoverImage';

export default ({ selected, projects, select }) => {
	return (
		<div className="w100 h100">
			<Axes />
      <Canvas projects={projects} select={select}/>
      <HoverImage selected={selected} />
		</div>
	);
}