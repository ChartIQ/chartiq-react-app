import React from 'react'
import ContextMenuDrawing from '../Features/ContextMenuDrawing'
import ContextMenuStudy from '../Features/ContextMenuStudy'
import DialogView from './DialogView'
import DialogStudy from './DialogStudy'
import DialogAggregation from './DialogAggregation'
import DialogTimezone from './DialogTimezone'
import DialogLanguage from './DialogLanguage'
import DialogShare from './DialogShare'
import DialogTheme from './DialogTheme'

/**
 * Chart dialogs component `<ChartDialogs>`
 * 
 * Container component for all ChartIQ UI dialog boxes. Though you may include each dialog component 
 * individually, using this component ensures that you have all necessary dialog components for proper 
 * operation of the ChartIQ UI.
 *
 * @export
 * @class ChartDialogs
 * @extends {React.Component}
 */
export default class ChartDialogs extends React.Component {
	render() {
		return(
			<>
			<DialogView />
			<DialogAggregation />
			<DialogStudy />
			<DialogTimezone />
			<DialogLanguage />
			<DialogShare />
			<DialogTheme />
			<ContextMenuDrawing />
			<ContextMenuStudy />
			</>
		)
	}
}
