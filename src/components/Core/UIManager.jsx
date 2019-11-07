import React from 'react'
import { ChartContext } from '../../react-chart-context'

/**
 * User interface management component `<UIManager/>`
 * 
 * IMPORTANT: The UIManager component is required for proper operation of any ChartIQ UI element.
 * 
 * Manages user input for all UI elements surrounding the chart, such as menus and dialogs.
 *
 * @export
 * @class UIManager
 * @extends {React.Component}
 */
export default class UIManager extends React.Component {
	constructor(props) {
		super(props)
		let context = this.context
		this.setContext = (update) => { this.context = update }
	}

	render() {
		return (
			<cq-ui-manager></cq-ui-manager>
		)		
	}
}

UIManager.contextType = ChartContext;
