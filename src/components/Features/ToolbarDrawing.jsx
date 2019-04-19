import React from 'react'
import { DrawingToolbar, CVPController, Menu, MenuDropdown, Undo, Redo } from 'components'
import { ChartContext } from '../../react-chart-context'

export default class ToolbarDrawing extends React.Component {

	componentDidMount () {
		$$$('chartiq-chart').stxx.setDrawingContainer($$$('cq-toolbar'))
		$$$('cq-redo').pairUp($$$('cq-undo'))
	}

	render () {
		let cvpTemplate = 
<React.Fragment>
<div cq-section="true">
<div className="ciq-heading">Dev 1</div>
<span stxtap="toggleActive()" className="ciq-checkbox">
	<span></span>
</span>
</div>
<cq-line-color cq-section="true" cq-overrides="auto" class="ciq-color" stxbind="getColor()" stxtap="pickColor()">
<span></span>
</cq-line-color>
<cq-line-style cq-section="true">
<cq-menu class="ciq-select">
	<span cq-cvp-line-style="true" className="ciq-line ciq-selected"></span>
	<cq-menu-dropdown class="ciq-line-style-menu">
		<cq-item stxtap="setStyle(1, 'solid')"><span className="ciq-line-style-option ciq-solid-1"></span></cq-item>
		<cq-item stxtap="setStyle(3, 'solid')"><span className="ciq-line-style-option ciq-solid-3"></span></cq-item>
		<cq-item stxtap="setStyle(5, 'solid')"><span className="ciq-line-style-option ciq-solid-5"></span></cq-item>
		<cq-item stxtap="setStyle(1, 'dotted')"><span className="ciq-line-style-option ciq-dotted-1"></span></cq-item>
		<cq-item stxtap="setStyle(3, 'dotted')"><span className="ciq-line-style-option ciq-dotted-3"></span></cq-item>
		<cq-item stxtap="setStyle(5, 'dotted')"><span className="ciq-line-style-option ciq-dotted-5"></span></cq-item>
		<cq-item stxtap="setStyle(1, 'dashed')"><span className="ciq-line-style-option ciq-dashed-1"></span></cq-item>
		<cq-item stxtap="setStyle(3, 'dashed')"><span className="ciq-line-style-option ciq-dashed-3"></span></cq-item>
		<cq-item stxtap="setStyle(5, 'dashed')"><span className="ciq-line-style-option ciq-dashed-5"></span></cq-item>
	</cq-menu-dropdown>
</cq-menu>
</cq-line-style>
</React.Fragment>
		return (
		<cq-toolbar cq-drawing-edit="none">
			<cq-menu class="ciq-select">
				<span cq-current-tool="true">Select Tool</span>
				<cq-menu-dropdown>
					<cq-item stxtap="noTool()">None</cq-item>
					<cq-item stxtap="clearDrawings()">Clear Drawings</cq-item>
					<cq-item stxtap="restoreDefaultConfig(true)">Restore Default Parameters</cq-item>
					<cq-item cq-tool="measure" stxtap="tool()">Measure</cq-item>
					<cq-separator></cq-separator>
					<cq-item cq-tool="annotation" stxtap="tool()">Annotation</cq-item>
					<cq-item cq-tool="average" stxtap="tool()">Average Line</cq-item>
					<cq-item cq-tool="callout" stxtap="tool()">Callout</cq-item>
					<cq-item cq-tool="channel" stxtap="tool()">Channel</cq-item>
					<cq-item cq-tool="continuous" stxtap="tool()">Continuous</cq-item>
					<cq-item cq-tool="crossline" stxtap="tool()">Crossline</cq-item>
					<cq-item cq-tool="freeform" stxtap="tool()">Doodle</cq-item>
					<cq-item cq-tool="ellipse" stxtap="tool()">Ellipse</cq-item>
					<cq-item cq-tool="retracement" stxtap="tool()">Fib Retracement</cq-item>
					<cq-item cq-tool="fibprojection" stxtap="tool()">Fib Projection</cq-item>
					<cq-item cq-tool="fibarc" stxtap="tool()">Fib Arc</cq-item>
					<cq-item cq-tool="fibfan" stxtap="tool()">Fib Fan</cq-item>
					<cq-item cq-tool="fibtimezone" stxtap="tool()">Fib Time Zone</cq-item>
					<cq-item cq-tool="gannfan" stxtap="tool()">Gann Fan</cq-item>
					<cq-item cq-tool="gartley" stxtap="tool()">Gartley</cq-item>
					<cq-item cq-tool="horizontal" stxtap="tool()">Horizontal</cq-item>
					<cq-item cq-tool="line" stxtap="tool()">Line</cq-item>
					<cq-item cq-tool="pitchfork" stxtap="tool()">Pitchfork</cq-item>
					<cq-item cq-tool="quadrant" stxtap="tool()">Quadrant Lines</cq-item>
					<cq-item cq-tool="ray" stxtap="tool()">Ray</cq-item>
					<cq-item cq-tool="rectangle" stxtap="tool()">Rectangle</cq-item>
					<cq-item cq-tool="regression" stxtap="tool()">Regression Line</cq-item>
					<cq-item cq-tool="segment" stxtap="tool()">Segment</cq-item>
					<cq-item cq-tool="arrow" stxtap="tool()">Shape - Arrow</cq-item>
					<cq-item cq-tool="check" stxtap="tool()">Shape - Check</cq-item>
					<cq-item cq-tool="xcross" stxtap="tool()">Shape - Cross</cq-item>
					<cq-item cq-tool="focusarrow" stxtap="tool()">Shape - Focus</cq-item>
					<cq-item cq-tool="heart" stxtap="tool()">Shape - Heart</cq-item>
					<cq-item cq-tool="star" stxtap="tool()">Shape - Star</cq-item>
					<cq-item cq-tool="speedarc" stxtap="tool()">Speed Resistance Arc</cq-item>
					<cq-item cq-tool="speedline" stxtap="tool()">Speed Resistance Line</cq-item>
					<cq-item cq-tool="timecycle" stxtap="tool()">Time Cycle</cq-item>
					<cq-item cq-tool="tirone" stxtap="tool()">Tirone Levels</cq-item>
					<cq-item cq-tool="trendline" stxtap="tool()">Trend Line</cq-item>
					<cq-item cq-tool="vertical" stxtap="tool()">Vertical</cq-item>
				</cq-menu-dropdown>
			</cq-menu>
			<cq-toolbar-settings>
				<cq-fill-color cq-section="true" class="ciq-color" stxbind="getFillColor()" stxtap="pickFillColor()">
					<span></span>
				</cq-fill-color>
				<div>
					<cq-line-color cq-section="true" cq-overrides="auto" class="ciq-color" stxbind="getLineColor()" stxtap="pickLineColor()"><span></span></cq-line-color>
					<cq-line-style cq-section>
						<cq-menu class="ciq-select">
							<span cq-line-style="true" className="ciq-line ciq-selected"></span>
							<cq-menu-dropdown class="ciq-line-style-menu">
								<cq-item stxtap="setLine(1,'solid')"><span className="ciq-line-style-option ciq-solid-1"></span></cq-item>
								<cq-item stxtap="setLine(3,'solid')"><span className="ciq-line-style-option ciq-solid-3"></span></cq-item>
								<cq-item stxtap="setLine(5,'solid')"><span className="ciq-line-style-option ciq-solid-5"></span></cq-item>
								<cq-item stxtap="setLine(1,'dotted')"><span className="ciq-line-style-option ciq-dotted-1"></span></cq-item>
								<cq-item stxtap="setLine(3,'dotted')"><span className="ciq-line-style-option ciq-dotted-3"></span></cq-item>
								<cq-item stxtap="setLine(5,'dotted')"><span className="ciq-line-style-option ciq-dotted-5"></span></cq-item>
								<cq-item stxtap="setLine(1,'dashed')"><span className="ciq-line-style-option ciq-dashed-1"></span></cq-item>
								<cq-item stxtap="setLine(3,'dashed')"><span className="ciq-line-style-option ciq-dashed-3"></span></cq-item>
								<cq-item stxtap="setLine(5,'dashed')"><span className="ciq-line-style-option ciq-dashed-5"></span></cq-item>
								<cq-item stxtap="setLine(0,'none')" className="ciq-none">None</cq-item>
							</cq-menu-dropdown>
						</cq-menu>
					</cq-line-style>
				</div>

				<cq-cvp-controller cq-section cq-cvp-header="1">
				</cq-cvp-controller>
				<cq-cvp-controller cq-section cq-cvp-header="2">

				</cq-cvp-controller>
				<cq-cvp-controller cq-section cq-cvp-header="3">
				</cq-cvp-controller>
					<template cq-cvp-controller="true">
						{cvpTemplate}
					</template>

				<cq-annotation cq-section="true">
					<cq-annotation-italic stxtap="toggleFontStyle('italic')" className="ciq-btn" style={{fontStyle:"italic"}}>I</cq-annotation-italic>
					<cq-annotation-bold stxtap="toggleFontStyle('bold')" className="ciq-btn" style={{fontWeight:"bold"}}>B</cq-annotation-bold>
					<cq-menu class="ciq-select">
						<span cq-font-size="true">12px</span>
						<cq-menu-dropdown class="ciq-font-size">
							<cq-item stxtap="setFontSize('8px')">8</cq-item>
							<cq-item stxtap="setFontSize('10px')">10</cq-item>
							<cq-item stxtap="setFontSize('12px')">12</cq-item>
							<cq-item stxtap="setFontSize('13px')">13</cq-item>
							<cq-item stxtap="setFontSize('14px')">14</cq-item>
							<cq-item stxtap="setFontSize('16px')">16</cq-item>
							<cq-item stxtap="setFontSize('20px')">20</cq-item>
							<cq-item stxtap="setFontSize('28px')">28</cq-item>
							<cq-item stxtap="setFontSize('36px')">36</cq-item>
							<cq-item stxtap="setFontSize('48px')">48</cq-item>
							<cq-item stxtap="setFontSize('64px')">64</cq-item>
						</cq-menu-dropdown>
					</cq-menu>
					<cq-menu class="ciq-select">
						<span cq-font-family="true">Default</span>
						<cq-menu-dropdown class="ciq-font-family">
							<cq-item stxtap="setFontFamily('Default')">Default</cq-item>
							<cq-item stxtap="setFontFamily('Helvetica')">Helvetica</cq-item>
							<cq-item stxtap="setFontFamily('Courier')">Courier</cq-item>
							<cq-item stxtap="setFontFamily('Garamond')">Garamond</cq-item>
							<cq-item stxtap="setFontFamily('Palatino')">Palatino</cq-item>
							<cq-item stxtap="setFontFamily('Times New Roman')">Times New Roman</cq-item>
						</cq-menu-dropdown>
					</cq-menu>
				</cq-annotation>
				<cq-clickable cq-fib-settings cq-selector="cq-fib-settings-dialog" cq-method="open" cq-section="true"><span className="ciq-btn">Settings</span></cq-clickable>
				<div className="ciq-drawing-edit-only" cq-section="true">
					<div cq-toolbar-action="done_edit" stxtap="DrawingEdit.endEdit('close')" cq-section="true"><cq-tooltip>Done Editing</cq-tooltip></div>
				</div>
				<div className="ciq-drawing-edit-hidden" cq-section="true">
					<div cq-toolbar-action="save" stxtap="saveConfig()" cq-section="true"><div cq-toolbar-dirty="true"></div><cq-tooltip>Save Config</cq-tooltip></div>
					<div cq-toolbar-action="restore" stxtap="restoreDefaultConfig()" cq-section="true"><cq-tooltip>Restore Config</cq-tooltip></div>
				</div>
			</cq-toolbar-settings>
			<cq-measure><span className="mMeasure"></span></cq-measure>
			<cq-undo-section className="ciq-drawing-edit-hidden">
				<cq-undo class="ciq-btn">Undo</cq-undo>
				<cq-redo class="ciq-btn">Redo</cq-redo>
			</cq-undo-section>
		</cq-toolbar>
		)
	}
}

ToolbarDrawing.contextType = ChartContext
