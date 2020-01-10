import React from 'react';
import ToggleTradePanel from '../Plugins/TFC/ToggleTradePanel';

export default class TradeToggles extends React.PureComponent {
	render() {
		return (this.props.tfc && <ToggleTradePanel />) || null;
	}
}
