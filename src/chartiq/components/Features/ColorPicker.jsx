import React from 'react'

/**
 * Color picker component `<ColorPicker/>`
 * 
 * Used in junction with ColorSwatch. UI Widget to select a color from a default palette. 
 *
 * @export
 * @class ColorPicker
 * @extends {React.Component}
 */
export default class ColorPicker extends React.Component {
	render() {
		return (
			<cq-color-picker></cq-color-picker>
		)
	}
}
