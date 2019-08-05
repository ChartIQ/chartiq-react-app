import React from 'react'
import MenuStudyLegend from './MenuStudyLegend'
import { ChartContext } from '../../react-chart-context'
import { Menu, MenuDropDown, Scroll, Studies, StudyLegend } from 'components'

/**
 * Chart menu component `<MenuStudies>`
 * 
 * IMPORTANT: To ensure proper stying, ALL menu components must be nested within a {@link ChartNav} container.
 * 
 * Dropdown menu of chart study display settings
 *
 * @export
 * @class MenuStudies
 * @extends {React.Component}
 */
export default class MenuStudies extends React.Component {
	
	componentDidMount () {
		let studies = $$$('cq-studies')
		let legend = $$$('cq-study-legend')
		var studyParams = {template: "#studies"}
		studies.initialize(studyParams)
		legend.begin()
	}

	

	render () {
		return (
			<cq-menu class="ciq-menu ciq-studies collapse">
				<span>Studies</span>
				<cq-menu-dropdown cq-no-scroll>
					<MenuStudyLegend heading={"Current Studies"} clearAll={true} />
					{this.props.plugins.ScriptIQ &&
						<>
						<cq-heading>ScriptIQ</cq-heading>
							<cq-item  onClick={this.context.resize} ><cq-clickable cq-selector="cq-scriptiq-editor" cq-method="open">New Script</cq-clickable></cq-item>
							<cq-scriptiq-menu>
								<cq-scriptiq-content>
										<template>
											<cq-item>
												<cq-label></cq-label>
												<div>
													<span className="ciq-edit"></span>
													<span className="ciq-icon ciq-close"></span>
												</div>
											</cq-item>
										</template>
								</cq-scriptiq-content>
							</cq-scriptiq-menu>
						<cq-separator></cq-separator>
						<cq-heading>Studies</cq-heading>
						</>
					}
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
MenuStudies.contextType = ChartContext