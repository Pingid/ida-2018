import React from 'react';
import Img from 'gatsby-image';

export default class LazyGif extends React.Component {
	state = { loaded: false }
	componentDidMount() {
  	this._ismounted = true;
		this.handleLowLoad.call(this, 'loaded', this.props.gif);
	}
	handleLowLoad(detail, gif) {
		const img = new Image();
		img.src = gif;
		img.onload = () => {
			if (this._ismounted) {
				this.setState({ [detail]: true });
			}
		}
	}
	componentWillUnmount() { this._ismounted = false; }
	render() {
		const { preload, gif } = this.props;
		const { loaded } = this.state;
		const getURL = () => {
			if (loaded && gif) return gif;
			return preload;
		}
		return (
			<div 
				className="cb-orange"
				style={{
					width: '100%',
					height: '100%',
					backgroundImage: `url(${getURL()})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center center',
				}}
			/>
		)
	}
}