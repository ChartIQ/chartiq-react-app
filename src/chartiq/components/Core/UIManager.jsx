import React from 'react'

/**
 * User interface management component `<UIManager/>`
 * 
 * IMPORTANT: A single UIManager component is required in document for proper operation of any ChartIQ UI element.
 * 
 * Manages user input for all UI elements surrounding the chart, such as menus and dialogs.
 *
 * @export
 * @class UIManager
 * @extends {React.Component}
 */
export default class UIManager extends React.Component {
	render() {
		return (
			<cq-ui-manager></cq-ui-manager>
		)		
	}
}
