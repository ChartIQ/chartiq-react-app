import React from 'react';
import { MultiChart } from '@chartiq/chartiq-react-components'
import { getConfig } from '@chartiq/chartiq-react-components/containers/MultiChart'



export default class MulitChartPage extends React.Component {
	render() {
		// If you want to customize the cofig for a chart, get a config obj here, 
		// and pass to chart props
		// const config0 = getConfig()
		// const config1 = getConfig()
		const chart0props = { symbol: 'FB' }
		const chart1props = { symbol: 'GOOG' }
		return (
			<MultiChart
				chart0={chart0props}
				chart1={chart1props}
			/>
		)
	}
}