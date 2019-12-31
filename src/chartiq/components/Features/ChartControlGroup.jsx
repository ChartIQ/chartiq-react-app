import React, { PureComponent } from 'react';
import { ChartContext } from '../../context/ChartContext';

import ToggleDrawing from '../Toggles/ToggleDrawing';
import ToggleCrosshair from '../Toggles/ToggleCrosshair';
import ChartLookup from '../Features/ChartLookup';
import MenuPeriodicity from '../Menus/MenuPeriodicity';

/**
 * Chart control group component `<ChartControlGroup />`
 * 
 * Displays a limited set of chart controls to overlay the chart itself while in full screen mode
 *
 * @class ChartControlGroup
 * @extends {React.PureComponent}
 */
export default class ChartControlGroup extends PureComponent {
	render () {

		const { 
			config: { menu_periodicity, chartControlGroup }
		} = this.context;

		const mapping = {
			chart_lookup: 			<ChartLookup />,
			toggle_drawing: 		<ToggleDrawing />,
			toggle_crosshair: 	<ToggleCrosshair />,
			menu_periodicity: 	<MenuPeriodicity items={menu_periodicity} />
		}

		const controlComponents = (chartControlGroup || []).map(control => mapping[control]);

		return (
			<cq-chartcontrol-group class="full-screen-show">
				{controlComponents}
			</cq-chartcontrol-group>
			)
	}
}

ChartControlGroup.contextType = ChartContext;