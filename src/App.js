import React, { Component } from 'react';

import InteractiveMap from './components/InteractiveMap';
import ProjectTiles from './components/ProjectTiles';

import 'basscss/css/basscss.css';

class App extends Component {
  state = { selected: null }
  render() {
    const { projects } = this.props;
    const { selected } = this.state;
    const selectedProject = projects.filter(x => x.slug === selected)[0] || null;

    return (
      <div>
        <InteractiveMap 
          projects={projects} 
          selected={selectedProject} 
          select={this.handleSelect.bind(this)} />
        <ProjectTiles 
          projects={projects} />
      </div>
    );
  }
  handleSelect(x) {
    if (this.state.selected === x) return;
    return this.setState({ selected: x });
  }
}

export default App;
