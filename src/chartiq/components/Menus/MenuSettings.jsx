import React from 'react';
import { CIQ } from 'chartiq/js/chartiq';
import { ChartContext } from '../../context/ChartContext';

/**
 * Chart menu component `<MenuSettings>`
 * 
 * IMPORTANT: To ensure proper stying, ALL menu components must be nested within a {@link ChartNav} container.
 * 
 * Dropdown menu of chart customization settings
 *
 * @export
 * @class MenuSettings
 * @extends {React.Component}
 */
export default class MenuSettings extends React.Component {
	constructor (){
		super()
		this.menuEl = React.createRef();
	}

	componentDidUpdate() {
		CIQ.UI.BaseComponent.buildReverseBindings(this.menuEl.current);
	}

	getMenuItems() {
		const self = this;
		const { items, pluginsInstalled = {}} = this.props || {};

		if (!items) {
			return null;
		}

		this.menuItems = items.map(itemToMarkup);
		return this.menuItems;
			
		function itemToMarkup({ label, action, option, type, required }, index) {
			if (type === 'heading') {
				return (<cq-heading key={label}>{label}</cq-heading>);
			}
			if (type === 'separator') {
				return (<cq-separator key={index}></cq-separator>);
			}
			if (type === 'checkbox') {
				if (required && !(pluginsInstalled[required] || CIQ[required])) {
					return null;
				}
				return (
					<cq-item stxsetget={action} key={label} >
						{label}
						<span className="ciq-checkbox ciq-active"><span></span></span>
					</cq-item>
				);
			}
			if (type === 'radio') {
				return (
					<cq-item key={label}>
						{option && <span className="ciq-edit" stxtap={option}></span>}
						<div stxsetget={action}>{label}<span className="ciq-radio"><span></span></span></div>
					</cq-item>
				);
			}
		}
	}

	render () {
		return (
			<cq-menu class="ciq-menu ciq-display collapse" ref={this.menuEl}>
				<span>Display</span>
				<cq-menu-dropdown>
					{this.getMenuItems()}
				</cq-menu-dropdown>
			</cq-menu>
		)
	}
}

MenuSettings.contextType = ChartContext;
