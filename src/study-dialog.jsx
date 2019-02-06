import React from 'react'
import { StudyContext, StudyDialog, StudyInput, StudyOutput, studyParameter } from 'components'
import ChartSwatch from './chart-swatch'
import ReactColorPicker from './color-picker'
import {ChartContext} from './react-chart-context'

export default class ChartStudyDialog extends React.Component {
	componentDidMount() {
		let studyContext = $$$("cq-study-context")
		this.context.UIContext.advertised["StudyEdit"].contextDialog = [studyContext]
		// let studies = $$$('cq-studies')
		// let legend = $$$('cq-study-legend')
		// console.log('ChartStudies... legend about to begin')
		// legend.begin()
		// let studyContext = $$$('cq-study-context')
		// console.log('initializing UIStudyEdit')
		// let UIStudyEdit=new CIQ.UI.StudyEdit(null, this.context.UIContext)
		// let stx = this.context.stx
		// function edit(fc) {
		// 	fc.apply(self, arguments)
		// }
		// stx.addEventListener('studyPanelEdit',edit)
		// stx.addEventListener('studyOverlayEdit', edit)
		// this.context.setContext({UIStudyEdit: studyContext})
	}

	render() {
		return (
<>
<cq-dialog>
	<cq-study-dialog cq-study-axis cq-study-panel>
		<h4 className="title">Study</h4>
		<cq-scroll cq-no-maximize>
			<cq-study-inputs>
				<template cq-study-input="true" className="cq-study-input">
					<cq-study-input>
						<div className="ciq-heading"></div>
						<div className="stx-data">
							<template cq-menu="true" className="cq-menu">
								<cq-menu class="ciq-select">
									<cq-selected></cq-selected>
									<cq-menu-dropdown cq-lift></cq-menu-dropdown>
								</cq-menu>
							</template>
						</div>
					</cq-study-input>
					<hr />
				</template>
			</cq-study-inputs>
			<cq-study-outputs>
				<template cq-study-output="true">
					<cq-study-output>
						<div className="ciq-heading"></div>
						<cq-swatch cq-overrides="auto"></cq-swatch>
					</cq-study-output>
					<hr/>
				</template>
			</cq-study-outputs>
			<cq-study-parameters>
				<template cq-study-parameters="true">
					<cq-study-parameter>
						<div className="ciq-heading"></div>
						<div className="stx-data"><cq-swatch cq-overrides="auto"></cq-swatch>
							<template cq-menu="true">
								<cq-menu class="ciq-select">
									<cq-selected></cq-selected>
									<cq-menu-dropdown cq-lift></cq-menu-dropdown>
								</cq-menu>
							</template>
						</div>
					</cq-study-parameter>
					<hr />
				</template>
			</cq-study-parameters>
		</cq-scroll>
		<div className="ciq-dialog-cntrls">
			<div className="ciq-btn" stxtap="close()">Done</div>
		</div>
	</cq-study-dialog>
</cq-dialog>

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

ChartStudyDialog.contextType = ChartContext;
