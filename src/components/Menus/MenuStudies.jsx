import React from 'react'
import { ChartContext } from '../../react-chart-context'
import { Menu, MenuDropDown, Scroll, Studies, StudyLegend } from 'components'

export default class MenuStudies extends React.Component {
	
	componentDidMount () {
		let studies = $$$('cq-studies')
		let legend = $$$('cq-study-legend')
		var studyParams = {template: "#studies"}
		studies.initialize(studyParams)
		console.log('ChartStudies... legend about to begin')
		legend.begin()
	}

	render () {
		return (
			<cq-menu class="ciq-menu ciq-studies collapse">
				<span>Studies</span>
				<cq-menu-dropdown cq-no-scroll>
					<cq-study-legend cq-no-close>
						<cq-section-dynamic>
							<cq-heading>Current Studies</cq-heading>
							<cq-study-legend-content>
								<template id="currentStudies">
									<cq-item>
										<cq-label className="click-to-edit ciq-edit"></cq-label>
										<div className="ciq-icon ciq-close"></div>
									</cq-item>
								</template>
							</cq-study-legend-content>
							<cq-placeholder>
								<div stxtap="Layout.clearStudies()" className="ciq-btn sm">Clear All</div>
							</cq-placeholder>
						</cq-section-dynamic>
					</cq-study-legend>
					{/*<!-- comment in the following lines if you have access to ScriptIQ -->
					<!-- <cq-heading>ScriptIQ</cq-heading>
						<cq-item><cq-clickable cq-selector="cq-scriptiq-editor" cq-method="open">New Script</cq-clickable></cq-item>
						<cq-scriptiq-menu>
							<cq-scriptiq-content>
									<template>
										<cq-item>
											<cq-label></cq-label>
											<div>
												<span class="ciq-edit"></span>
												<span class="ciq-icon ciq-close"></span>
											</div>
										</cq-item>
									</template>
							</cq-scriptiq-content>
						</cq-scriptiq-menu>
					<cq-separator></cq-separator>
					<cq-heading>Studies</cq-heading> -->*/}
					<cq-scroll>
						<cq-studies>
							<cq-studies-content>
									<template id="studies">
										<cq-item>
											<cq-label></cq-label>
										</cq-item>
									</template>
							</cq-studies-content>
						</cq-studies>
					</cq-scroll>
				</cq-menu-dropdown>
			</cq-menu>
		)
	}
}
