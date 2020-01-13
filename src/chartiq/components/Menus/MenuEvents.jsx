import React from 'react';

import { CIQ, MarkersSample } from 'chartiq/examples/markers/markersSample';
import { ChartContext } from '../../context/ChartContext';

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
	constructor() {
		super();
		this.state = {
			activeEvent: 'none'
		}
		this.markerImplementation = {};
		this.menuEl = React.createRef();
	}

	componentDidMount() {
		const { UIContext, stx } = this.context;
		this.markerImplementation = new MarkersSample(stx);

		// set up helper for forwarding marker handling events
		const self = this;
		const Markers = {
			show(node, item) { 
				self.setState({ activeEvent: item });
				self.markerImplementation.hideMarkers();
				self.markerImplementation.showMarkers(item.replace('none', ''));
			}
		};

		UIContext.advertiseAs(Markers, 'Markers');
	}


	componentDidUpdate() {
		// re-bind as timespan events are loaded lazy
		CIQ.UI.BaseComponent.buildReverseBindings(this.menuEl.current);
	}

	render() {
		const { activeEvent } = this.state;
		const { menuEvents, plugins } = this.context.config;
		if (!menuEvents) {
			return null;
		}
		
		const menuItems = (menuEvents || []).map((item, index) => {
			// hiding items will allow to bind to stxtap event at once without
			// requiring additional binding request
			const style = {
				display: item.required && !this.markerImplementation[item.required] ? 'none' : ''
			};
			
			return <MenuItem {...item} selected={activeEvent === item.markertype} key={index} style={style} />
		});

		return (
			<cq-menu class="ciq-menu stx-markers collapse" ref={this.menuEl}>
				<span>Events</span>
				<cq-menu-dropdown ref={this.markerDropdown}>
					{ menuItems }
					{plugins && plugins.timeSpanEvents && CIQ.UI.TimeSpanEvent && 
						<div className="timespanevent-ui" >
							<cq-separator></cq-separator>
							<cq-heading>Panel Events</cq-heading>
							<cq-item class="span-event" stxtap="TimeSpanEvent.showMarkers('Order')" cq-no-close>Order<span className="ciq-checkbox ciq-active" ><span></span></span></cq-item>
							<cq-item class="span-event" stxtap="TimeSpanEvent.showMarkers('CEO')" cq-no-close>CEO<span className="ciq-checkbox ciq-active" ><span></span></span></cq-item>
							<cq-item class="span-event" stxtap="TimeSpanEvent.showMarkers('News')" cq-no-close>News<span className="ciq-checkbox ciq-active" ><span></span></span></cq-item>
						</div>
					}
				</cq-menu-dropdown>
			</cq-menu>
		);
	}
}

function MenuItem({label, markertype, selected, style}) {
	return !label
		? <cq-separator></cq-separator>
		: (<cq-item stxtap={`Markers.show('${markertype}')`} key={label} style={style}>
				{label}
				<span className={`ciq-radio ${ selected ? 'ciq-active' : ''}`}>
					<span></span>
				</span>
			</cq-item>);
}

MenuEvents.contextType = ChartContext;
