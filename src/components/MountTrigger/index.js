import React from 'react';

export default class MountTrigger extends React.Component {
	constructor(props) {
		super(props);
		this.state = { mounted: !this.props.animate || false };
	}
	componentWillReveiveProps() {
		this.setState({ mounted: !this.props.animate || false });
	}
	componentDidMount() {
		if (this.props.active !== false) {
			setTimeout(() => this.setState({ mounted: true }), 0);
		}
	}
	render() {
		const { mounted } = this.state;
		return this.props.children(mounted)
	}
}