import React from 'react'
import ContextMenuDrawing from '../Menus/ContextMenuDrawing'
import ContextMenuStudy from '../Menus/ContextMenuStudy'
import DialogView from './DialogView'
import DialogStudy from './DialogStudy'
import DialogAggregation from './DialogAggregation'
import DialogTimezone from './DialogTimezone'
import DialogLanguage from './DialogLanguage'
import DialogShare from './DialogShare'
import DialogTheme from './DialogTheme'

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
