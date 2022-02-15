
import React from 'react'

export default function MissingFeature({ feature, type }) {
	return (
		<section style={{
			display:'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginTop: '15vh',
			fontSize: '16px'
		}}>
			<h3>{ feature }</h3>
			<p>
				{feature} {type} is not available in your ChartIQ installed library<br /><br />
				Contact <a href='mailto:support.chartiq.com'>support@chartiq.com</a> if you have questions about obtaining this feature. 
			</p>
			
		</section>
	)	
}