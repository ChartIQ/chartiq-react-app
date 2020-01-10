import React from 'react';
import ToggleCrosshair from './ToggleCrosshair';
import ToggleDrawing from './ToggleDrawing';
import ToggleHUD from './ToggleHUD';
import { ChartContext } from '../../context/ChartContext';

import { CIQ } from 'chartiq/js/chartiq';

/**
 * Component that holds other toggle components. `<ChartToggles />`
 *
 * Also contains a toggle for displaying toggles in sidenav for mobile
 *
 * @export
 * @class ChartToggles
 * @extends React.Component
 */
export default class ChartToggles extends React.Component {
	constructor() {
		super();
		this.state = {
			sidenavActive: '',
			sidenavAvailable: false
		};
		this.toggleSidenav = React.createRef();
	}

	componentDidMount() {
		const { layout } = this.context.stx;

		this.updateSidenav = this.updateSidenav.bind(this);
		CIQ.UI.observeProperty('sidenav', layout, this.updateSidenav);

		// toggle button requires registering callback or it will manage active class for nonempty value
		this.toggleSidenav.current.registerCallback(() => {});
	}

	componentWillUnmount() {
		const { layout } = this.context.stx;
		CIQ.UI.unobserveProperty('sidenav', layout, this.updateSidenav);
	}

	updateSidenav({ value }) {
		this.setState({ sidenavActive: value === 'sidenavOn' ? 'active' : '' });
	}

	getToggleButtons() {
		// if already created return results
		if (this.toggles) {
			return this.toggles;
		}

		const {
			headerLeft: { toggles },
			headsUpDisplayTypes
		} = this.context.config;

		const toggleMapping = {
			drawing: <ToggleDrawing key="drawing" />,
			crosshair: <ToggleCrosshair key="crosshair" />,
			info: <ToggleHUD headsUpDisplayTypes={headsUpDisplayTypes} key="info" />
		};

		this.toggles = toggles.map(name => toggleMapping[name]);
		return this.toggles;
	}

	render() {
		const { sidenavActive } = this.state;
		const { sidenavAvailable } = this.context;

		const sidenavBtnClass = `ciq-sidenav ${sidenavActive}`;
		const sidenavClass = `
			icon-toggles
			${sidenavAvailable ? 'sidenav' : 'ciq-toggles'}
			${sidenavActive}
		`;

		return (
			<>
				<div className="sidenav-toggle ciq-toggles">
					<cq-toggle
						class={sidenavBtnClass}
						cq-member="sidenav"
						cq-toggles="sidenavOn,sidenavOff"
						ref={this.toggleSidenav}
					>
						<span></span>
						<cq-tooltip>More</cq-tooltip>
					</cq-toggle>
				</div>

				<div className={sidenavClass}>{this.getToggleButtons()}</div>
			</>
		);
	}
}

ChartToggles.contextType = ChartContext;
