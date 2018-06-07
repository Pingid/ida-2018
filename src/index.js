import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './styles/index.css';
import App from './App';
import ProjectGallery from './components/ProjectGallery';
import registerServiceWorker from './utils/registerServiceWorker';

import { getSheet } from './utils/spreadsheet';

import data from './data.json';

const sort = projects => projects
	.filter(x => x.projectName && x.mapCoOrdinates) 
  .map(x => Object.assign({}, x, { slug: x.yourName.replace(/\s|,\s/gi, '-').toLowerCase() }));

class Routes extends React.Component {
	state = { projects: sort(data) }
  componentDidMount() {
    // getSheet()
    //   .then(projects => 
    //     this.setState({ 
    //       projects: sort(projects)
    //     })
    //   );
  }
	render() {
		const { projects } = this.state;

		return (
			<Router>
				<div>
				{ projects.length > 2 && (
						<div>
							<Route exact path="/" render={() => <App projects={projects} />} />
							<Route exact path="/project/:slug" render={props => <ProjectGallery projects={projects} {...props} />} />
						</div>
					)
				}
				</div>
			</Router>
		)
	}
}

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
