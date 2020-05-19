import React from 'react';
import ChartTitle from '../Core/ChartTitle';
import { 
	ChartControlGroup,
	ChartComparison,
	ChartLegend 
} from '../Features/';
import { CIQ } from 'chartiq/js/chartiq';

/**
 * Presentational component that holds the chart title, comparison widget and chart legend.
 */
export default class TitleOverlay extends React.PureComponent {


	render() {
		return (
			<>
				<ChartTitle />
				{CIQ.FullScreen && <ChartControlGroup />} 
				<ChartComparison /> 
				<ChartLegend />
			</>
		);
	}
}
