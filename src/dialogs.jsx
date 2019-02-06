import React from 'react'
import ChartViewDialog from './view-dialog'
import ChartStudyDialog from './study-dialog'
import ChartAggregationDialog from './aggregation-dialog'
import ChartTimezoneDialog from './timezone-dialog'
import ChartLanguageDialog from './language-dialog'
import ChartShareDialog from './share-dialog'
import ChartThemesDialog from './themes-dialog'
import DrawingMenus from './drawing-dialog'

export default class Dialogs extends React.Component {
	render() {
		return(
			<>
			<ChartViewDialog />
			<ChartAggregationDialog />
			<ChartStudyDialog />
			<ChartTimezoneDialog />
			<ChartLanguageDialog />
			<ChartShareDialog />
			<ChartThemesDialog />
			<DrawingMenus />
			</>
		)
	}
}
