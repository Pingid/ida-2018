import React from 'react';
import Img from 'gatsby-image';

export default class LazyGif extends React.Component {
	state = { loaded: false }
	componentDidMount() {
  	this._ismounted = true;

		const { gif } = this.props;
		const img = new Image();
		img.src = gif;
		img.onload = () => this._ismounted && this.setState({ loaded: true });
	}
	componentWillUnmount() { this._ismounted = false; }
	render() {
		const { preload, gif } = this.props;
		return (
			<div 
				style={{
					width: '100%',
					height: '100%',
					backgroundImage: `url(${this.state.loaded ? gif : preload})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}}
			/>
		)
	}
}