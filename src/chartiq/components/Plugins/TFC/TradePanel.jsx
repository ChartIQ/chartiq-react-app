import React from 'react';
import { ChartContext } from '../../../context/ChartContext';

export default class TradePanel extends React.Component {
	constructor() {
		super();
		this.tradePanel = React.createRef();
	}

	componentDidMount() {
		this.context.registerComponent({ TradePanel: this });
	}

	render() {
		return (
			<React.Fragment>
				<h2>THis is not rendered</h2>
				<div className="stx-panel-side stx-trade-panel" ref={this.tradePanel}>
					<div className="stx-wrapper stx-trade-nav">
						<ul className="stx-orders">
							<li className="stx-market" style={{ display: 'none' }}><a>MKT</a></li>
							<li className="stx-buy" style={{ display: 'none' }}><a>Buy</a></li>
							<li className="stx-sell" style={{ display: 'none' }}><a>Sell</a></li>
							<li className="stx-short" style={{ display: 'none' }}><a>Short</a></li>
							<li className="stx-cover" style={{ display: 'none' }}><a>Cover</a></li>
							<li className="stx-strangle" style={{ display: 'none' }}>
								<a>Strangle</a>
								<div className="stx-tooltip left"><div>Strangle</div><span></span></div>
							</li>
							<li className="stx-straddle" style={{ display: 'none' }}>
								<a>Straddle</a>
								<div className="stx-tooltip left"><div>Straddle</div><span></span></div>
							</li>
							<li className="stx-bracket" style={{ display: 'none' }}>
								<a>Bracket</a>
								<div className="stx-tooltip left">	<div>Bracket</div><span></span></div>
							</li>
						</ul>
						<ul className="stx-account">
							<li>
								<span>Cash</span> <span className="tfc-current-cash"></span>
							</li>
							<li>
								<span>Funds Available</span>{' '}
								<span className="tfc-current-funds"></span>
							</li>
							<li>
								<span>Position</span>{' '}
								<span className="tfc-current-position"></span>
							</li>
						</ul>
						<a
							className="stx-trade-ticket-toggle open"
							onClick={this.context.resize}
						>
							Expand/Collapse
						</a>
					</div>

					<div className="stx-wrapper stx-trade-info active">
						<ul className="stx-orders">
							<li className="stx-market" style={{ display: 'none' }}><a>MKT</a></li>
							<li className="stx-buy" style={{ display: 'none' }}><a>Buy</a></li>
							<li className="stx-sell" style={{ display: 'none' }}><a>Sell</a></li>
							<li className="stx-short" style={{ display: 'none' }}><a>Short</a></li>
							<li className="stx-cover" style={{ display: 'none' }}><a>Cover</a></li>
							<li className="stx-strangle" style={{ display: 'none' }}>
								<a>Strangle</a>
								<div className="stx-tooltip left"><div>Strangle</div><span></span></div>
							</li>
							<li className="stx-straddle" style={{ display: 'none' }}>
								<a>Straddle</a>
								<div className="stx-tooltip left"><div>Straddle</div><span></span></div>
							</li>
							<li className="stx-bracket" style={{ display: 'none' }}>
								<a>Bracket</a>
								<div className="stx-tooltip left"><div>Bracket</div><span></span></div>
							</li>
						</ul>

						<div className="stx-panel-module stx-trade-account">
							<div className="stx-section">
								<table border="0" cellSpacing="0" cellPadding="0">
									<tbody>
										<tr>
											<td>Net Liquidation Value</td>
											<td className="tfc-liquidity"></td>
										</tr>
										<tr>
											<td>Unsettled Cash</td>
											<td className="tfc-unsettled-cash"></td>
										</tr>
										<tr>
											<td>Cash and Sweep Vehicle</td>
											<td className="tfc-cash"></td>
										</tr>
										<tr>
											<td>Unrealized Gain/Loss</td>
											<td className="tfc-profitloss"></td>
										</tr>
										<tr>
											<td>Available Funds for Trading</td>
											<td className="tfc-buying-power"></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div
							className="stx-panel-module stx-trade-positions"
							style={{ position: 'relative' }}
						>
							<div className="stx-head-bar">
								<h4>
									<span className="stx-ico"></span>Positions
								</h4>
								<div className="stx-btn click stx-close-all">Close All</div>
								<ul className="tfc-positions-view holder">
									<li className="tfc-positions-view summary active">
										<i className="fa"></i>
									</li>
									<li className="tfc-positions-view lots">
										<i className="fa"></i>
									</li>
									<li className="tfc-positions-view performance">
										<i className="fa"></i>
									</li>
									<li className="tfc-positions-view maintenance">
										<i className="fa">/</i>
									</li>
								</ul>
							</div>

							<div className="stx-section stx-holder">
								<table
									cellSpacing="0"
									cellPadding="0"
									border="0"
									className="stx-current-position"
								>
									<thead>
										<tr className="tfc-positions-view summary active">
											<th scope="col">SYM</th>
											<th scope="col">QTY</th>
											<th scope="col">Basis</th>
											<th scope="col">G/L</th>
											<th scope="col">% G/L</th>
										</tr>
										<tr className="tfc-positions-view lots">
											<th scope="col" className="tfc-trade-date">
												Date
											</th>
											<th scope="col">QTY</th>
											<th scope="col">Basis</th>
											<th scope="col">G/L</th>
											<th scope="col">% G/L</th>
										</tr>
										<tr className="tfc-positions-view performance">
											<th scope="col">SYM</th>
											<th scope="col">Cost</th>
											<th scope="col">Value</th>
											<th scope="col">G/L</th>
											<th scope="col">% G/L</th>
										</tr>
										<tr className="tfc-positions-view maintenance">
											<th scope="col" className="tfc-col-qty">
												QTY
											</th>
											<th scope="col">Basis</th>
											<th scope="col" className="tfc-trade-actions" colSpan="S">
												Protections
											</th>
											<th scope="col"></th>
										</tr>
									</thead>
									<tbody></tbody>
								</table>
							</div>
						</div>

						<div
							className="stx-panel-module stx-trade-current"
							style={{ position: 'relative' }}
						>
							<div className="stx-head-bar">
								<h4>
									<span className="stx-ico"></span>Open Orders
								</h4>
							</div>
							<div className="stx-section stx-holder">
								<table
									cellSpacing="0"
									cellPadding="0"
									border="0"
									className="stx-current-orders"
								>
									<tbody></tbody>
								</table>
							</div>
						</div>
						<a
							className="stx-trade-ticket-toggle close"
							onClick={this.context.resize}
						>
							Expand/Collapse
						</a>
					</div>
				</div>
			</React.Fragment>
		);
	}
}
TradePanel.contextType = ChartContext;
