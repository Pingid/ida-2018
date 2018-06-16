import React from 'react';

export default class LazyGif extends React.Component {
	state = { loaded: false }
	componentDidMount() {
		const { gif } = this.props;
		const img = new Image();
		img.src = gif;
		img.onload = () => this.setState({ loaded: true })
	}
	render() {
		const { preload, gif } = this.props;
		return <div 
			style={{
				width: '100%',
				height: '100%',
				// filter: 'brightness(120%)',
				backgroundImage: `url(${this.state.loaded ? gif : preload})`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center center',
			}}
		/>
	}
}