import React from 'react';
import MultiChart from './MultiChart'

export default function () {
	const chart0props = { symbol: 'FB' }
	const chart1props = { symbol: 'GOOG' }
	return (
		<MultiChart
			chart0={chart0props}
			chart1={chart1props}
		/>
	)
}