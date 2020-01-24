import React from 'react'

/**
 * Theme dialog component `<DialogTheme/>`
 * 
 * Displays dialog with options to select custom theme colors.
 *
 * @export
 * @class DialogTheme
 * @extends {React.Component}
 */
export default class DialogTheme extends React.Component {

	render () {
		return (
<cq-dialog>
	<cq-theme-dialog>
		<h4 className="title">Create Custom Theme</h4>
		<cq-close></cq-close>
		<cq-scroll cq-no-maximize>
			<cq-section>
				<cq-placeholder>Candle Color
					<cq-theme-piece cq-piece="cu"><cq-swatch cq-overrides="Hollow"></cq-swatch></cq-theme-piece>
					<cq-theme-piece cq-piece="cd"><cq-swatch cq-overrides="Hollow"></cq-swatch></cq-theme-piece>
				</cq-placeholder>
				<cq-placeholder>Candle Wick
					<cq-theme-piece cq-piece="wu"><cq-swatch></cq-swatch></cq-theme-piece>
					<cq-theme-piece cq-piece="wd"><cq-swatch></cq-swatch></cq-theme-piece>
				</cq-placeholder>
				<cq-placeholder>Candle Border
					<cq-theme-piece cq-piece="bu"><cq-swatch cq-overrides="No Border"></cq-swatch></cq-theme-piece>
					<cq-theme-piece cq-piece="bd"><cq-swatch cq-overrides="No Border"></cq-swatch></cq-theme-piece>
				</cq-placeholder>
				<cq-separator></cq-separator>
				<cq-placeholder>Line/Bar Chart
					<cq-theme-piece cq-piece="lc"><cq-swatch></cq-swatch></cq-theme-piece>
				</cq-placeholder>
				<cq-separator></cq-separator>
				<cq-placeholder>Mountain Base
					<cq-theme-piece cq-piece="mb"><cq-swatch></cq-swatch></cq-theme-piece>
				</cq-placeholder>
				<cq-placeholder>Mountain Peak
					<cq-theme-piece cq-piece="mc"><cq-swatch></cq-swatch></cq-theme-piece>
				</cq-placeholder>
			</cq-section>
			<cq-section>
				<cq-placeholder>Background
					<cq-theme-piece cq-piece="bg"><cq-swatch></cq-swatch></cq-theme-piece>
				</cq-placeholder>
				<cq-placeholder>Grid Lines
					<cq-theme-piece cq-piece="gl"><cq-swatch></cq-swatch></cq-theme-piece>
				</cq-placeholder>
				<cq-placeholder>Date Dividers
					<cq-theme-piece cq-piece="dd"><cq-swatch></cq-swatch></cq-theme-piece>
				</cq-placeholder>
				<cq-placeholder>Axis Text<cq-theme-piece cq-piece="at"><cq-swatch></cq-swatch></cq-theme-piece>
				</cq-placeholder>
			</cq-section>
			<cq-action>
				<input /><div stxtap="save()" className="ciq-btn">Save</div>
			</cq-action>
		</cq-scroll>
	</cq-theme-dialog>
</cq-dialog>
		)
	}
}
