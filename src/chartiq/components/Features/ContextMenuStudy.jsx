import React from 'react';
import { ChartContext } from '../../context/ChartContext';

/**
 * Chart menu component `<ContextMenuStudy>`
 *
 *
 * Contextual menu which provides additional settings for chart studies.
 *
 * @export
 * @class ContextMenuStudy
 * @extends {React.Component}
 */
export default class ContextMenuStudy extends React.Component {
	constructor() {
		super();
		this.contextMenuRef = React.createRef();
	}
	componentDidMount() {
		const studyContext = this.contextMenuRef.current;
		this.context.UIContext.advertised['StudyEdit'].contextDialog = [
			studyContext
		];
	}

	render() {
		return (
			<>
				<cq-dialog>
					<cq-study-context ref={this.contextMenuRef}>
						<div stxtap="StudyEdit.edit()">Edit Settings...</div>
						<div stxtap="StudyEdit.remove()">Delete Study</div>
					</cq-study-context>
				</cq-dialog>
			</>
		);
	}
}

ContextMenuStudy.contextType = ChartContext;
