import React from 'react'
import { ChartContext } from '../../react-chart-context'

/**
 * Drawing palette component `<PaletteDrawing>`
 * 
 * UI widget containing all tools for interactive drawing on the chart.
 *
 * @export
 * @class PaletteDrawing
 * @extends {React.Component}
 */
export default class PaletteDrawing extends React.Component {
	constructor() {
		super()
		this.toolbar = React.createRef()
		this.undoButton = React.createRef()
		this.redoButton = React.createRef()
		this.magnetToggle = React.createRef()
	}

	componentDidMount () {
		let UIContext = this.context.UIContext;
		let stx = this.context.stx;
		let toolbar = this.toolbar.current;
		let magnetToggle = this.magnetToggle.current;
		UIContext.PaletteDrawing = toolbar;
		stx.setDrawingContainer(toolbar)

		this.redoButton.current.pairUp(this.undoButton.current)
		magnetToggle.registerCallback(function(value){
			if(!isNaN(parseInt(value,10))) {
				magnetToggle.classList.add('active');
				magnetToggle.classList.remove('strong');
			}else if(!value || value=="false"){
				magnetToggle.classList.remove('active');
				magnetToggle.classList.remove('strong');
			}else{
				magnetToggle.classList.add('active');
				magnetToggle.classList.add('strong');
			}
		}, false);
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
			<cq-palette-dock>
				<div className="palette-dock-container">
					<cq-drawing-palette class="palette-drawing grid palette-hide" docked="true" orientation="vertical" min-height="300" cq-drawing-edit="none">
						<div className="palette-container">
							<div className="drag-strip"></div>
								<div className="mini-widget-group">
										<cq-item class="ciq-mini-widget" cq-view="list" stxtap="changeView('list')"><span className="icon"></span><label>List View</label></cq-item>
										<cq-item class="ciq-mini-widget" cq-view="grid" stxtap="changeView('grid')"><span className="icon"></span><label>Grid View</label></cq-item>
										<cq-item class="ciq-mini-widget" cq-view="detach" stxtap="detach()"><span className="icon"></span><label>Detach</label></cq-item>
										<cq-item class="ciq-mini-widget" cq-view="attach" stxtap="dock()"><span className="icon"></span><label>Attach</label></cq-item>
								</div>
								<cq-separator></cq-separator>
								<div className="primary-tool-group">
									<cq-item class="ciq-tool active" cq-tool="notool" stxtap="tool()"><span className="icon pointer"></span><label>No Tool</label></cq-item>
									<cq-item class="ciq-tool" cq-tool="measure" stxtap="tool()"><span className="icon measure"></span><label>Measure</label></cq-item>
									<cq-undo class="ciq-tool" ref={this.undoButton}><span className="icon undo"></span><label>Undo</label></cq-undo>
									<cq-redo class="ciq-tool" ref={this.redoButton}><span className="icon redo"></span><label>Redo</label></cq-redo>
									<cq-menu class="ciq-select">
										<span cq-tool-group-selection="true">All</span>
										<cq-menu-dropdown class="ciq-tool-group-selection">
											<cq-item stxtap="setToolGroup('all')" cq-tool-group="all">All</cq-item>
											<cq-item stxtap="setToolGroup('favorite')" cq-tool-group="favorite">Favorites</cq-item>
											<cq-item stxtap="setToolGroup('text')" cq-tool-group="text">Text</cq-item>
											<cq-item stxtap="setToolGroup('statistics')" cq-tool-group="statistics">Statistics</cq-item>
											<cq-item stxtap="setToolGroup('technicals')" cq-tool-group="technicals">Technicals</cq-item>
											<cq-item stxtap="setToolGroup('fibonacci')" cq-tool-group="fibonacci">Fibonacci</cq-item>
											<cq-item stxtap="setToolGroup('marking')" cq-tool-group="marking">Markings</cq-item>
											<cq-item stxtap="setToolGroup('line')" cq-tool-group="line">Lines</cq-item>
										</cq-menu-dropdown>
									</cq-menu>
								</div>
								<cq-separator></cq-separator>
								<div className="tool-group" tool-group-filter="all">
									<cq-scroll cq-no-resize>
										<cq-item class="ciq-tool" cq-tool="annotation" cq-tool-group="text" stxtap="tool()"><span className="icon annotation"></span><label>Annotation</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="callout" cq-tool-group="text" stxtap="tool()"><span className="icon callout"></span><label>Callout</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="average" cq-tool-group="statistics" stxtap="tool()"><span className="icon average"></span><label>Average Line</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="channel" cq-tool-group="line" stxtap="tool()"><span className="icon channel"></span><label>Channel</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="continuous" cq-tool-group="line" stxtap="tool()"><span className="icon continuous"></span><label>Continuous</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="crossline" cq-tool-group="line" stxtap="tool()"><span className="icon crossline"></span><label>Crossline</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="freeform" cq-tool-group="line" stxtap="tool()"><span className="icon freeform"></span><label>Doodle</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="ellipse" cq-tool-group="marking" stxtap="tool()"><span className="icon ellipse"></span><label>Ellipse</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="retracement" cq-tool-group="fibonacci" stxtap="tool()"><span className="icon retracement"></span><label>Fib Retracement</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="fibprojection" cq-tool-group="fibonacci" stxtap="tool()"><span className="icon fibprojection"></span><label>Fib Projection</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="fibarc" cq-tool-group="fibonacci" stxtap="tool()"><span className="icon fibarc"></span><label>Fib Arc</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="fibfan" cq-tool-group="fibonacci" stxtap="tool()"><span className="icon fibfan"></span><label>Fib Fan</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="fibtimezone" cq-tool-group="fibonacci" stxtap="tool()"><span className="icon fibtimezone"></span><label>Fib Time Zone</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="gannfan" cq-tool-group="technicals" stxtap="tool()"><span className="icon gannfan"></span><label>Gann Fan</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="gartley" cq-tool-group="technicals" stxtap="tool()"><span className="icon gartley"></span><label>Gartley</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="horizontal" cq-tool-group="line" stxtap="tool()"><span className="icon horizontal"></span><label>Horizontal</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="line" cq-tool-group="line" stxtap="tool()"><span className="icon line"></span><label>Line</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="pitchfork" cq-tool-group="technicals" stxtap="tool()"><span className="icon pitchfork"></span><label>Pitchfork</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="quadrant" cq-tool-group="statistics" stxtap="tool()"><span className="icon quadrant"></span><label>Quadrant Lines</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="ray" cq-tool-group="line" stxtap="tool()"><span className="icon ray"></span><label>Ray</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="rectangle" cq-tool-group="marking" stxtap="tool()"><span className="icon rectangle"></span><label>Rectangle</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="regression" cq-tool-group="statistics" stxtap="tool()"><span className="icon regression"></span><label>Regression Line</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="segment" cq-tool-group="line" stxtap="tool()"><span className="icon segment"></span><label>Segment</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="arrow" cq-tool-group="marking" stxtap="tool()"><span className="icon arrow"></span><label>Arrow</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="check" cq-tool-group="marking" stxtap="tool()"><span className="icon check"></span><label>Check</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="xcross" cq-tool-group="marking" stxtap="tool()"><span className="icon xcross"></span><label>Cross</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="focusarrow" cq-tool-group="marking" stxtap="tool()"><span className="icon focusarrow"></span><label>Focus</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="heart" cq-tool-group="marking" stxtap="tool()"><span className="icon heart"></span><label>Heart</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="star" cq-tool-group="marking" stxtap="tool()"><span className="icon star"></span><label>Star</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="speedarc" cq-tool-group="technicals" stxtap="tool()"><span className="icon speedarc"></span><label>Speed Resistance Arc</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="speedline" cq-tool-group="technicals" stxtap="tool()"><span className="icon speedline"></span><label>Speed Resistance Line</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="timecycle" cq-tool-group="technicals" stxtap="tool()"><span className="icon timecycle"></span><label>Time Cycle</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="tirone" cq-tool-group="statistics" stxtap="tool()"><span className="icon tirone"></span><label>Tirone Levels</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="trendline" cq-tool-group="text" stxtap="tool()"><span className="icon trendline"></span><label>Trend Line</label></cq-item>
										<cq-item class="ciq-tool" cq-tool="vertical" cq-tool-group="line" stxtap="tool()"><span className="icon vertical"></span><label>Vertical</label></cq-item>
									</cq-scroll>
									<cq-separator></cq-separator>
									<div className="mini-widget-group mini-widget-foot">
										<cq-toggle class="ciq-mini-widget ciq-magnet" cq-member="preferences.magnet" cq-toggles="true,75,false" ref={this.magnetToggle}><span className="icon magnet"></span><label>Magnet</label></cq-toggle>
										<cq-item class="ciq-mini-widget" stxtap="clearDrawings()"><span className="icon clear"></span><label>Clear Drawings</label></cq-item>
										<cq-item class="ciq-mini-widget" stxtap="restoreDefaultConfig(true)"><span className="icon restore"></span><label>Restore Default Parameters</label></cq-item>
									</div>
								</div>
							<div className="resize-strip"></div>
						</div>
					</cq-drawing-palette>
					
					<cq-drawing-settings ref={this.toolbar} class="palette-settings" hide="true" docked="true" orientation="horizontal" min-height="40" cq-drawing-edit="none">
						<div className="palette-container">
							<div className="drag-strip"></div>
								<div className="drawing-settings-wrapper">
									<div className="mini-widget-group">
										<cq-item class="ciq-mini-widget" cq-view="detach" stxtap="detach()"><span className="icon"></span><label>Detach</label></cq-item>
										<cq-item class="ciq-mini-widget" cq-view="attach" stxtap="dock()"><span className="icon"></span><label>Attach</label></cq-item>
									</div>
									<cq-clickable class="ciq-select ciq-mobile-palette-toggle" stxtap="togglePalette()"><span>Select Tool</span></cq-clickable>
									<div className="ciq-active-tool-label ciq-heading"></div>
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
														<cq-item stxtap="setLine(0,'none')" class="ciq-none">None</cq-item>
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
											<cq-annotation-italic stxtap="toggleFontStyle('italic')" class="ciq-btn" style={{fontStyle:"italic"}}>I</cq-annotation-italic>
											<cq-annotation-bold stxtap="toggleFontStyle('bold')" class="ciq-btn" style={{fontWeight:"bold"}}>B</cq-annotation-bold>
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
										<cq-clickable cq-fib-settings cq-selector="cq-fib-settings-dialog" cq-method="open" cq-section="true"><span className="ciq-icon-btn cq-icon-gear"></span><cq-tooltip></cq-tooltip></cq-clickable>
										<div className="ciq-drawing-edit-only" cq-section="true">
											<div cq-toolbar-action="done_edit" stxtap="DrawingEdit.endEdit('close')" cq-section="true"><cq-tooltip>Done Editing</cq-tooltip></div>
										</div>
										<div className="ciq-drawing-edit-hidden" cq-section="true">
											<div cq-toolbar-action="save" stxtap="saveConfig()" cq-section="true"><div cq-toolbar-dirty="true"></div><cq-tooltip>Save Config</cq-tooltip></div>
											<div cq-toolbar-action="restore" stxtap="restoreDefaultConfig()" cq-section="true"><cq-tooltip>Restore Config</cq-tooltip></div>
										</div>
									</cq-toolbar-settings>
									<cq-measure><span className="mMeasure"></span></cq-measure>
								</div>
							<div className="resize-strip"></div>
						</div>
					</cq-drawing-settings>
				</div>
			</cq-palette-dock>
		)
	}
}

PaletteDrawing.contextType = ChartContext
