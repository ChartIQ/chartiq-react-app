import React from 'react'
import { ChartContext } from '../../react-chart-context'
import { Toggle } from 'components'

export default class ToggleHUD extends React.Component {
	componentDidMount() {
		let UIContext = this.context.UIContext
		let headsUpStatic = UIContext.UIHeadsUpStatic
		let headsUpDynamic = this.context.UIContext.UIHeadsUpDynamic

		$$$(".ciq-HU").registerCallback(function(value){
			if(value==="static"){
				headsUpDynamic.end();
				headsUpStatic.begin();
				this.node.addClass("active");
			}else if(value==="dynamic"){
				if(CIQ.isMobile || this.context.stx.layout.crosshair){
					// The dynamic headsUp doesn't make any sense on mobile devices so we skip that toggle
					// by manually setting the toggle to "static"
					this.set("static");
					headsUpDynamic.end();
					headsUpStatic.begin();
					this.node.addClass("active");
				}else{
					headsUpStatic.end();
					headsUpDynamic.begin();
					this.node.addClass("active");
				}
			}else{
				headsUpStatic.end();
				headsUpDynamic.end();
				this.node.removeClass("active");
			}
		});
	}

	render() {
		const UIContext = this.context.UIContext
		const hud = 
		<cq-toggle class="ciq-HU" cq-member="headsUp" cq-toggles="dynamic,static,null">
			<span></span><cq-tooltip>Info</cq-tooltip>
		</cq-toggle>
		console.log('render hud toggles')
		return( UIContext.UIHeadsUpDynamic && UIContext.UIHeadsUpDynamic && hud)

	}
}

ToggleHUD.contextType = ChartContext
