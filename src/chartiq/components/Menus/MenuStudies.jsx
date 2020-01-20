import React from 'react';

import { CIQ } from 'chartiq/js/chartiq';
import { ChartContext } from '../../context/ChartContext';

// import MenuStudyLegend from './MenuStudyLegend';
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
		const studies = this.studiesRef.current;
		const { includeOnly = [], exclude = [] } = this.props.filter || {};

		const excludedStudies = Object.entries(CIQ.Studies.studyLibrary).reduce(
			(acc, [key, { name }]) => {
				if (includeOnly.length) {
					if (!includeOnly.includes(name)) {
						// not on included list
						acc[key] = name;
					}
					return acc;
				}

				if (exclude.length) {
					if (exclude.includes(name)) {
						// not on included list
						acc[key] = name;
					}
					return acc;
				}
				return acc;
			},
			{}
		);

		const studyParams = { template: '#studies', excludedStudies };
		studies.initialize(studyParams);
	}

	render() {
		return (
			<cq-menu class="ciq-menu ciq-studies collapse">
				<span>Studies</span>
				<cq-menu-dropdown cq-no-scroll>
					<cq-study-legend-container />
					{this.props.plugins.scriptIQ && CIQ.Scripting && (
						<>
							<cq-heading>ScriptIQ</cq-heading>
							<cq-item onClick={this.context.resize}>
								{/* finds cq-scriptiq-editor and invokes open method */}
								<cq-clickable cq-selector="cq-scriptiq-editor" cq-method="open">
									New Script
								</cq-clickable>
							</cq-item>
							<cq-scriptiq-menu>
								<cq-scriptiq-content>
									{/* template for the cq-script-menu to create new menu items */}
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
						</>
					)}
					<cq-heading cq-filter="" cq-filter-min="-1">Studies</cq-heading> {/* cq-filter-min="-1" forces to display filter */}
					<cq-scroll cq-no-maximize="true">
						<cq-studies ref={this.studiesRef}>
							<cq-studies-content>
								{/* template for the cq-studies to create new menu items */}
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
