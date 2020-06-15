import React from 'react';
import { ChartContext } from '../../context/ChartContext';

import { CIQ } from 'chartiq/js/chartiq';

export default class SidenavToggle extends React.Component {
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
		);
	}
}

SidenavToggle.contextType = ChartContext;
