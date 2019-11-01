import React from 'react'
import { CIQ, $$$ } from 'chartiq'
import { ChartContext } from '../../react-chart-context'

/**
 * Chart menu component `<MenuEvents>`
 * 
 * IMPORTANT: To ensure proper stying, ALL menu components must be nested within a {@link ChartNav} container.
 * 
 * Dropdown menu of event marker display settings
 *
 * @export
 * @class MenuEvents
 * @extends {React.Component}
 */
export default class MenuEvents extends React.Component {

	constructor(){
		super();
		this.markerDropdown = React.createRef();
	}

	componentDidMount(){
		// Attach an stxtap event handler to all cq-item tags in the events menu
		[...this.markerDropdown.current.querySelectorAll('cq-item')].forEach((menuitem) => {
			// Skip menu items that don't have a markertype attribute
			if(menuitem.attributes.markertype){
				menuitem.addEventListener('stxtap', this.eventStxtapHandler.bind(this, menuitem));
			}
		});
	}

	eventStxtapHandler(e){
		if(e.attributes.markertype){
			this.activateMarker(e, e.attributes.markertype.value);
		}else{
			console.log('Event marker type not found.')
		}
	}

	resetMarkerMenu(){
		// Remove active class from all menu item radio buttons
		[...this.markerDropdown.current.querySelectorAll('cq-item .ciq-radio')].forEach((menuitem) => {
			menuitem.classList.remove("ciq-active");
		});
	}

	activateMarker(target, type) {
		let chart = this.context.stx.container;
		this.resetMarkerMenu();
		target.querySelector('.ciq-radio').classList.add("ciq-active");
		if (type == "helicopter") 
			this.activateHelicopter();
		else if (type == "none") 
			chart.hideMarkers();
		else 
			chart.showMarkers(type);
	}

	activateHelicopter() {
		let helicopter = CIQ.UI.makeFromTemplate(document.querySelector("template.abstract"))[0];
		this.context.stx.container.hideMarkers();
		
		var marker=new CIQ.Marker({
			stx: this.context.stx,
			xPositioner:"none",
			yPositioner:"above_candle",
			label: "helicopter",
			permanent: true,
			chartContainer: true,
			node: helicopter
		});

		var leftPositition = this.context.stx.chart.width*0.4;
		document.querySelector('div.stx-marker.abstract').setAttribute('style', `z-index: 21; left: ${leftPositition}px`);
		
		this.context.stx.draw();
	}

	render () {
		return (
			<cq-menu class="ciq-menu stx-markers collapse">
				<span>Events</span>
				<cq-menu-dropdown ref={this.markerDropdown}>
					<cq-item className="square" markertype="square">Simple Square<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item className="circle" markertype="circle">Simple Circle<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item className="callout" markertype="callout">Callouts<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item className="abstract" markertype="helicopter">Abstract<span className="ciq-radio"><span></span></span>
					</cq-item>
					<cq-item className="none" markertype="none">None<span className="ciq-radio ciq-active"><span></span></span>
					</cq-item>
				</cq-menu-dropdown>
			</cq-menu>
		)
	}
}

MenuEvents.contextType = ChartContext
