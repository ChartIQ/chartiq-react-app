import React from 'react';
import { ChartContext } from '../../../ChartContext';

export default class MarketDepth extends React.Component {
	constructor() {
		super();
		this.depthRef = React.createRef();
	}

	componentDidMount() {
		this.context.registerComponent({ MarketDepth: this });
	}

	render() {
		return (
			<React.Fragment>
				<div className="market-depth-bookmark" ref={this.depthRef}></div>
			</React.Fragment>
		);
	}
}
MarketDepth.contextType = ChartContext;
