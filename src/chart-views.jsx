import React from 'react'
import { Menu, MenuDropDown, Scroll, Views } from 'components'
import { ChartContext } from './react-chart-context'

export default class ChartViews extends React.Component {
	componentDidMount() {
		var views = $$$('cq-views')
		views.params = {};
		views.template = $$$('template.cq-view')
		views.initialize()
	}

	render() {
		return(
<cq-menu class="ciq-menu ciq-views collapse">
	<span>Views</span>
	<cq-menu-dropdown>
		<cq-views>
		<cq-heading>Saved Views</cq-heading>
			<cq-views-content>
				<template cq-view="">
					<cq-item>
					<cq-label></cq-label>
					<div className={"ciq-icon ciq-close"}></div>
					</cq-item>
				</template>
			</cq-views-content>
			
			<cq-separator cq-partial></cq-separator>
			
			<cq-view-save>
				<cq-item><cq-plus></cq-plus>Save View</cq-item>
			</cq-view-save>
		</cq-views>
	</cq-menu-dropdown>
</cq-menu>
		)
	}
}

ChartViews.contextType = ChartContext;
