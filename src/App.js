import React, { Component } from 'react';
import Axes from './components/Axes';
import Spread from './components/Spread';
import Canvas from './components/Canvas';
import HoverImage from './components/HoverImage';

import 'basscss/css/basscss.css';
import { getSheet } from './utils/spreadsheet';

class App extends Component {
  state = { people: [], selected: null }
  componentDidMount() {
    getSheet()
      .then(people => 
        this.setState({ 
          people: people
            .filter(x => x.projectName && x.mapCoOrdinates) 
            .map(x => Object.assign({}, x, { slug: x.yourName.replace(/\s|,\s/gi, '-').toLowerCase() }))
        })
      );
  }
  render() {
    const { people, selected } = this.state;

    return (
      <div>
      	<div>
        	<Axes />
          <Canvas people={people} select={this.handleSelect.bind(this)}/>
          <HoverImage selected={people.filter(x => x.slug === selected)[0] || null} />
        </div>
      </div>
    );
  }
  handleSelect(x) {
    if (this.state.selected === x) return;
    return this.setState({ selected: x });
  }
}

export default App;
