import React from 'react';
import classNames from 'classnames';
import Link from 'gatsby-link';


class ScrollGallery extends React.Component {
	constructor() {
		super();
		this.state = { active: false, scroll: 0, height: null };

		this._handleScroll = this._handleScroll.bind(this);
	}
	componentDidMount() { window.addEventListener('scroll', this._handleScroll) }
	componentWillUnmount() { window.removeEventListener('scroll', this._handleScroll) }
	render() {
		const { images } = this.props;
		const { active, after, height, scroll } = this.state;
		
		const innerWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
		const innerHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

		return (
			<div 
				className="border-box"
				id="node1"
				style={{
					height: height || innerWidth,
				}} 
				ref={elem => this.parentNode = elem}>
				<div className={classNames('flex justify-center items-center', { fixed: active })} style={{ height: '100vh', width: '100vw', top: 0, left: 0 }}>
					<div 
						style={{ 
							paddingTop: after ? (innerWidth * images.length) - innerWidth : 0,
							overflowY: 'hidden', 
							height: '100vh', 
							width: '100vw' 
						}}
						className="flex overflow-auto touch-overflow hide-bar" 
						ref={elem => this.scrollElem = elem}>
						{ 
							images.map((x, i) => (
								<div key={x.srcSet} className="flex items-center justify-center border-box" style={{ width: '100%', height: '100%', flex: '0 0 auto', padding: '2.5vw' }}>
									<img srcSet={x.srcSet} />
								</div>
							))
						}
					</div>
					<div 
						className={classNames('absolute justify-between flex wfit border-box trans', { 'hide': !active })} 
						style={{ bottom: 0, left: 0, padding: '0 5vw' }}>
						<h5 className="caps" onClick={() => this.scrollTop()}>top</h5>
						<h5 
							className={classNames('caps trans', { hide: (scroll + innerHeight + 5) > height })}
							onClick={() => this.scrollToImage(Math.ceil((this.scrollElem.scrollLeft + 10)/ innerWidth))}>next</h5>
					</div>
				</div>
				{ 
					// images.map((x, i) => (
					// 	<div key={x.sizes.src} style={{ borderLeft: '10px dashed', borderRight: '10px dashed', height: innerWidth, zIndex: 20 }}>
					// 		<h1 className="p2">0{i}</h1>
					// 	</div>
					// ))
				}
			</div>
		)
	}
	elemOffsetTop(elem) {
		if (!elem) return 0;
		const bodyRect = document.body.getBoundingClientRect();
	  const elemRect = elem.getBoundingClientRect();
		return elemRect.top - bodyRect.top;
	}
	_handleScroll(e) {
		const { images } = this.props; 
		const { active, after, scroll:prevScroll } = this.state;

		const innerWidth = window && window.innerWidth || 0;
		const innerHeight = window && window.innerHeight || 0;
		
		// Total height of gallery
		const height = (innerWidth * images.length) - innerWidth + innerHeight;
		let scroll = Math.max(0, pageYOffset - this.elemOffsetTop(this.parentNode));
		
		// Check if scroll is passed gallery
		if (scroll > height && !after) { this.setState({ after: true }); }
		if (scroll < height && after) { this.setState({ after: false }); }

		// Is scroll within bounds of gallery
		if (scroll > 0 && scroll < height && this.scrollElem) {

			// Has horizontal scroll of gallery changed
			const sideScroll = Math.floor(prevScroll) !== Math.floor(this.scrollElem.scrollLeft);
			
			// How much horizontal scroll of gallery has changed
			const sideScrollDiff = prevScroll - this.scrollElem.scrollLeft;
			
			// if horizontal scroll has changed update vertical scroll to match
			if (sideScroll) { scrollTo(0, pageYOffset - sideScrollDiff) } 

			// Update horizontal scroll of gallery
			this.scrollElem.scrollLeft = scroll;

			// Confirm that state reflects current situation
			if (!active) this.setState({ active: true, height });
		} 
		else if (active) { this.setState({ active: false }); }
		if (!active && this.scrollElem.scrollLeft !== 0) { this.scrollElem.scrollLeft = 0; }
		this.setState({ scroll });
	}
	scrollToImage(n) {
		const innerWidth = window && window.innerWidth || 0;
		scrollTo({
	    top: this.elemOffsetTop(this.parentNode) + innerWidth * n,
	    behavior: "smooth"
		});
	}
	scrollTop() {
		scrollTo({
	    top: 0,
	    behavior: "smooth"
		});
	}
}

export default ScrollGallery;