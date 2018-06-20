import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import MountTrigger from '../MountTrigger';
import LazyGif from '../LazyGif';
import ReactPlayer from 'react-player';

import './index.css';

export default class ProjectHeader extends React.Component {
	constructor() {
		super();
		this.state = { videoClosed: true, revert: false };

		this.handleScroll = this.handleScroll.bind(this);
		this.handleAnimationBack = this.handleAnimationBack.bind(this);
	}
	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll)
	}
	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}
	handleScroll(e) {
		const top = window.pageYOffset || document.documentElement.scrollTop;
		if (!this.state.videoClosed && top > 50) { this.setState({ videoClosed: true }) }
	}
	handleAnimationBack() {
		this.setState({ revert: true });
	}
	render() {
		const { project, animate } = this.props;
		const { videoClosed, revert } = this.state;
		return (
			<MountTrigger animate={animate} revert={revert}>
				{ (mounted) => (
					<div className="project-header-wrapper">
						<div className={classNames('gif-wrapper', { ['gif-wrapper-closed']: (mounted && videoClosed) } )}>
							<div className="wfit hfit lazy-gif"><LazyGif preload={project.preload} gif={videoClosed ? project.gif : project.src} /></div>
							<div className={classNames('video-wrapper', { ['video-wrapper-closed']: videoClosed })}>
								<ReactPlayer playing={!videoClosed} width="100%" height="70vh" style={{ background: 'transparent' }} url={project.videoLink} />
							</div>
						</div>
						<div style={{ }} className={classNames('title', { 
							[`title-active`]: (mounted && videoClosed), black: project.gif.length < 1 })}>
							<div>{project.projectName}</div>
						</div>
						{ project.videoLink && (
								<div
									onClick={() => project.videoLink && this.setState({ videoClosed: !videoClosed })}
									className={classNames("wfit center relative video-button", { ['video-button-active']: !videoClosed })}>
									<h3 style={{ cursor: 'pointer' }} className={classNames('caps', { white: videoClosed })}>{videoClosed ? 'play video' : ''}</h3>
								</div>
						)}
					</div>
				)} 
			</MountTrigger>
		)
	}
}