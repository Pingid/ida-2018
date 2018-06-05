import React from 'react';

import Axes from './Axes';
import Canvas from './Canvas';
import HoverImage from './HoverImage';

export default class InteractiveMap extends React.Component {
	state = { selected: null }
	render() {
		const { projects } = this.props;
		const { selected } = this.state;

		const selectedProject = projects.filter(x => x.slug === selected)[0] || null;
		return (
			<div className="w100 h100">
				<Axes />
	      <Canvas projects={projects} select={this.handleSelect.bind(this)}/>
	      <HoverImage selected={selectedProject} />
			</div>
		);
	}
	handleSelect(x) {
    if (this.state.selected === x) return;
    return this.setState({ selected: x });
  }
}