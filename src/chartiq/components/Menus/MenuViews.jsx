import React from 'react';
import { ChartContext } from '../../context/ChartContext';

/**
 * Chart menu component `<MenuViews>`
 *
 * IMPORTANT: To ensure proper stying, ALL menu components must be nested within a {@link ChartNav} container.
 *
 * Dropdown menu of chart view display settings
 *
 * @export
 * @class MenuViews
 * @extends {React.Component}
 */
export default class MenuViews extends React.Component {
	constructor() {
		super();
		this.templateRef = React.createRef();
		this.viewsRef = React.createRef();
	}

	componentDidMount() {
		var views = this.viewsRef.current;
		views.params = {};
		views.template = this.templateRef.current;
		views.initialize();
	}

	render() {
		return (
			<cq-menu class="ciq-menu ciq-views collapse">
				<span>Views</span>
				<cq-menu-dropdown>
					<cq-views ref={this.viewsRef}>
						<cq-heading>Saved Views</cq-heading>
						<cq-views-content>
							<template cq-view="" ref={this.templateRef}>
								<cq-item>
									<cq-label></cq-label>
									<div className={'ciq-icon ciq-close'}></div>
								</cq-item>
							</template>
						</cq-views-content>

						<cq-separator cq-partial></cq-separator>

						<cq-view-save>
							<cq-item>
								<cq-plus></cq-plus>Save View
							</cq-item>
						</cq-view-save>
					</cq-views>
				</cq-menu-dropdown>
			</cq-menu>
		);
	}
}

MenuViews.contextType = ChartContext;
