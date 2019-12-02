import React from 'react';
import { ChartContext } from '../../ChartContext';

export default class ChartArea extends React.Component {
	constructor() {
		super();
		this.chartAreaRef = React.createRef();
	}

	componentDidMount() {
		let ref = this.chartAreaRef.current;
		this.context.setContext({
			chartArea: {
				width: ref.clientWidth,
				height: ref.clientHeight,
				node: ref
			}
		});
	}

	resizeChart() {}

	render() {
		const { left, right } = this.props;
		return (
			<React.Fragment>
				<div className="ciq-chart-area" ref={this.chartAreaRef} style={{ left, right }}>
					{this.props.children}
				</div>
			</React.Fragment>
		);
	}
}

ChartArea.contextType = ChartContext;
