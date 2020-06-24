import React from 'react';
import { CIQ } from 'chartiq/js/chartiq';

import { ChartContext } from '../../context/ChartContext';

export default class SidenavToggle extends React.Component {
	constructor() {
		super();
		this.state = {
			sidenavActive: ''
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
		const sidenavBtnClass = `ciq-sidenav ${sidenavActive}`;

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
