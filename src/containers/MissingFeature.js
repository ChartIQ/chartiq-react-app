
import React from 'react'

export default function MissingFeature({ feature, type }) {
	return (
		<section style={{
			display:'flex',
			flexDirection: 'column',
			alignItems: 'center',
			marginTop: '15vh'
		}}>
			<h3>{ feature }</h3>
			<p>
				Feature not found! If {feature} {type} is available, import it in Router.js<br/>
				Contact <a href='mailto:support.chartiq.com'>support@chartiq.com</a> if you have questions about obtaining this feature. 
			</p>
			
		</section>
	)	
}