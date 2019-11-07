import React from 'react'
import { CIQ } from 'chartiq'
import { MarkersSample } from 'chartiq/examples/markers/markersSample'
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
		// The MarkersSample should take the chart engine as an argument here but it hasn't been created yet
		// instead we will correct the reference once the component mounts and the engine has been created.
		// We're going with this work around so that we do not need to change the ChartMenus component
		// to be aware of the context so we can keep it presentationl and only render this component when the engine is ready.
		this.markers = new MarkersSample()
	}

	componentDidMount(){
		this.markers.stx = this.context.stx;
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
			this.markers.showMarkers();
		else 
			this.markers.showMarkers(type);
	}

	activateHelicopter() {
		let helicopter = CIQ.UI.makeFromTemplate(document.querySelector("template.abstract"))[0];
		this.markers.showMarkers();
		new CIQ.Marker({
			stx: this.context.stx,
			xPositioner:"none",
			yPositioner:"above_candle",
			label: "helicopter",
			permanent: true,
			chartContainer: true,
			node: helicopter
		});

		var leftPositition = this.context.stx.chart.width*0.4;
		helicopter.setAttribute('style', `z-index: 21; left: ${leftPositition}px`);
		
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
					{ this.markers && this.markers.showTradeAnalytics && <cq-item className="trade"markerType="trade">Trade<span className="ciq-radio"><span></span></span>
					</cq-item> }
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
