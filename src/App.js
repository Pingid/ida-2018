import React, { Component } from 'react';

import InteractiveMap from './components/InteractiveMap';
import ProjectTiles from './components/ProjectTiles';

import 'basscss/css/basscss.css';

class App extends Component {
  render() {
    const { projects } = this.props;
    return (
      <div>
        <InteractiveMap projects={projects} />
        <ProjectTiles projects={projects} />
      </div>
    );
  }
}

export default App;
