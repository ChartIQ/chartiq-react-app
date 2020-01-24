import React from 'react'

/**
 * Chart menu component `<MenuStudyLegend>`
 * 
 * IMPORTANT: To ensure proper stying, ALL menu components must be nested within a {@link ChartNav} container.
 * 
 * Menu of that displays current active studies on a chart.
 *
 * @export
 * @class MenuStudies
 * @extends {React.Component}
 *
 * @param clearAll boolean When truthy sets displays a button to clear all studies.
 * @param heading string Sets a heading on the menu
 * @param icon boolean controls whether to display an edit icon. If icon is not displayed clicking on the study name will open editing.
 * @param only string Adds a filter to display only certain types of studies. Acceptable values are: "overlays", "panel", "custom"
 */
export default class MenuStudyLegend extends React.Component {
	constructor() {
		super()
		this.legend = React.createRef();
	}

	componentDidMount () {
		let filter
		var props = this.props
		if(props.only === "overlays") {
			filter = 'cq-overlays-only'
		} else if (props.only ==="panel") {
			filter = 'cq-panel-only'
		} else if (props.custom === "custom") {
			filter = 'cq-custom-removal-only'
		}
		this.legend.current.setAttribute(filter, true)
		this.legend.current.begin()
	}

	render () {
		let props = this.props

		let clearButton
		if (props.clearAll) {
			clearButton = <cq-placeholder>
				<div stxtap="Layout.clearStudies()" className="ciq-btn sm">Clear All</div>
			</cq-placeholder>
		}
		return (	
			<cq-study-legend cq-no-close ref={this.legend} >
				<cq-section-dynamic>
					<cq-study-legend-content>
						<cq-heading>{ props.heading }</cq-heading>
						<template id="currentStudies">
							<cq-item>
								<cq-label className="click-to-edit ciq-edit"></cq-label>
								{ props.icon && <span className="ciq-edit"></span> }
								<div className="ciq-icon ciq-close"></div>
							</cq-item>
						</template>
					</cq-study-legend-content>
				{ clearButton }	
				</cq-section-dynamic>
			</cq-study-legend>
		)
	}
}
