import React from 'react'
import { Lookup, Menu, MenuDropDown, Scroll } from 'components'
import { ChartContext } from '../../react-chart-context'

export default class MarkerAbstract extends React.Component {

	render() {
		const leftPosition = this.context.stx.chart.width*0.4
		const helicopter = 
		<template className='abstract'>
			<div className="stx-marker abstract">
			<div className="stx-marker-content">
			<div className="sample">
				<div id="stage">
					<div id="helicopter">
						<div id="propeller">
							<div id="spinner" style={{"WebkitTransformOrigin": "40px 0 0", "TransformOrigin": "40px 0 0"}}>
								<div style={{WebkitTransform: 'rotateY(0deg) translateX(40px)', Transform: 'rotateY(0deg) translateX(40px)'}}></div>
								<div style={{WebkitTransform: 'rotateY(-90deg) translateX(40px)', Transform: 'rotateY(-90deg) translateX(40px)'}}></div>
								<div style={{WebkitTransform: 'rotateY(-180deg) translateX(40px)', Transform: 'rotateY(-180deg) translateX(40px)'}}></div>
								<div style={{WebkitTransform: 'rotateY(-270deg) translateX(40px)', Transform: 'rotateY(-270deg) translateX(40px)'}}></div>
							</div>
						</div>
						{/* React or Webpack seems to be appending an extra 'css' to the class when we set the image
						so instead we'll set it explicitly here. */}
						<div id="heli-body" style={{background: 'url(css/img/helicopter.png)'}}></div>
					</div>
				</div>
			<div className="text">This is an example of a complex marker which can contain html, video, images, css, and animations.</div>
			</div>
			{/*</div>
			</div>*/}
		</div>
		</div>
		</template>
		return( this.context.stx.chart && helicopter )
	}
}

MarkerAbstract.contextType = ChartContext
