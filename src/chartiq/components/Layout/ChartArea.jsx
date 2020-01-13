import React from 'react';
import { ChartContext } from '../../context/ChartContext';

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

	render() {
		const { left, right, header, footer } = this.props;
		const style = { 
			left,
			right, 
			top: header ? '' : 0,  // if header exists use class setting
			bottom: footer ? '' : 0  // if footer use class setting
		}
		
		return (
			<React.Fragment>
				<div className="ciq-chart-area" ref={this.chartAreaRef} style={style}>
					{this.props.children}
				</div>
			</React.Fragment>
		);
	}
}

ChartArea.contextType = ChartContext;
