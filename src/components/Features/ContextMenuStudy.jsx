import React from 'react'
import { ChartContext } from '../../react-chart-context'

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

	componentDidMount() {
		let studyContext = $$$("cq-study-context")
		this.context.UIContext.advertised["StudyEdit"].contextDialog = [studyContext]
	}

	render() {
		return(
			<>
			<cq-dialog>
				<cq-study-context>
					<div stxtap="StudyEdit.edit()">Edit Settings...</div>
					<div stxtap="StudyEdit.remove()">Delete Study</div>
				</cq-study-context>
			</cq-dialog>
			</>
		)
	}
}

ContextMenuStudy.contextType = ChartContext
