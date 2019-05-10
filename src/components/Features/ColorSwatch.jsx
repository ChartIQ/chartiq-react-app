import React from 'react'
import { Swatch } from 'components'

/**
 * Color swatch component `<ColorSwatch/>`
 * 
 * UI widget to visually display a color value. Use in junction with the `<ColorPicker/>` component
 *
 * @export
 * @class ColorSwatch
 * @extends {React.Component}
 */
export default class ColorSwatch extends React.Component {
	render() {
		return (
			<cq-swatch></cq-swatch>
		)
	}
} 
