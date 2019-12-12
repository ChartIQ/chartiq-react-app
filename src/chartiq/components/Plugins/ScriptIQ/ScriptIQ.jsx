import React from 'react';
import { ChartContext } from '../../../context/ChartContext';

export default class ScriptIQ extends React.Component {
	constructor() {
		super();
		this.scriptiqRef = React.createRef();
	}

	componentDidMount() {
		this.context.components.ScriptIQ = this;
		if (!this.scriptiqRef.current) return;
		this.context.UIContext.ScriptIQ = this.scriptiqRef.current;
	}

	render() {
		return (
			<cq-scriptiq class="scriptiq-ui" ref={this.scriptiqRef}></cq-scriptiq>
		);
	}
}
ScriptIQ.contextType = ChartContext;
