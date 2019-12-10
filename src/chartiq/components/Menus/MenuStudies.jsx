import React from 'react';
import MenuStudyLegend from './MenuStudyLegend';
import { ChartContext } from '../../ChartContext';

import '../../webcomponent-containers/study-legend';

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
	constructor() {
		super();
		this.studiesRef = React.createRef();
	}

	componentDidMount() {
		let studies = this.studiesRef.current;
		var studyParams = { template: '#studies' };
		studies.initialize(studyParams);
	}

	render() {
		return (
			<cq-menu class="ciq-menu ciq-studies collapse">
				<span>Studies</span>
				<cq-menu-dropdown cq-no-scroll>
					{/* <MenuStudyLegend heading={"Current Studies"} clearAll={true} ref={this.studyLegendRef}/> */}
					<cq-study-legend-container />
					{this.props.plugins.scriptIQ && (
						<>
							<cq-heading>ScriptIQ</cq-heading>
							<cq-item onClick={this.context.resize}>
								<cq-clickable cq-selector="cq-scriptiq-editor" cq-method="open">
									New Script
								</cq-clickable>
							</cq-item>
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
					)}
					<cq-scroll>
						<cq-studies ref={this.studiesRef}>
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
		);
	}
}
MenuStudies.contextType = ChartContext;
