import React from 'react';
import { ChartContext } from '../../context/ChartContext';

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
		super();
		this.toolbar = React.createRef();
		this.undoButton = React.createRef();
		this.redoButton = React.createRef();
		this.magnetToggle = React.createRef();
		this.paletteDock = React.createRef();
	}

	componentDidMount() {
		const UIContext = this.context.UIContext;
		const stx = this.context.stx;
		const toolbar = this.toolbar.current;
		const magnetToggle = this.magnetToggle.current;
		UIContext.PaletteDrawing = toolbar;
		UIContext.PaletteDock = this.paletteDock.current;
		stx.setDrawingContainer(toolbar);

		this.redoButton.current.pairUp(this.undoButton.current);
		magnetToggle.registerCallback(function(value) {
			if (!isNaN(parseInt(value, 10))) {
				magnetToggle.classList.add('active');
				magnetToggle.classList.remove('strong');
			} else if (!value || value == 'false') {
				magnetToggle.classList.remove('active');
				magnetToggle.classList.remove('strong');
			} else {
				magnetToggle.classList.add('active');
				magnetToggle.classList.add('strong');
			}
		}, false);
		// magnetToggle.registerCallback(() => {}, false);
	}

	buildLists() {
		if (this.drawingToolItems) {
			return;
		}
		const { drawingTools, drawingToolGrouping, drawingFonts, drawingFontSizes } = this.context.config;
		this.drawingToolItems = drawingTools.map(({ tool, group, label }) => (
			<cq-item class="ciq-tool" cq-tool={tool} cq-tool-group={group} stxtap={`tool('${tool}')`} key={tool}>
				<span className={`icon ${tool}`}></span>
				<label>{label}</label>
			</cq-item>
		));

		// const capitalize = word => word[0].toUpperCase() + word.substr(1);
		// drawingTools.forEach(
		// 	({ group }) => (drawingToolGrouping[capitalize(group)] = true)
		// );
		this.groupDropdown = (
			<cq-menu-dropdown class="ciq-tool-group-selection">
				{drawingToolGrouping
					.map(group => {
						const groupProperty = group.toLowerCase();
						return <cq-item stxtap={`setToolGroup('${groupProperty}')`} cq-tool-group={groupProperty} key={group}>
							{group}
						</cq-item>;
					})}
			</cq-menu-dropdown>
		);
		this.fontFamilyMenu = <cq-menu-dropdown class="ciq-font-family">
			{drawingFonts.map(font => (
				<cq-item stxtap={`setFontFamily('${font}')`} style={{ fontFamily: font === 'Default' ? 'inherit' : font }} key={font}>
					{font}
				</cq-item>
			))}
			</cq-menu-dropdown>;

		this.fontSizeMenu = <cq-menu-dropdown class="ciq-font-size">
			{drawingFontSizes.map(size => <cq-item stxtap={`setFontSize('${size}px')`} key={size}>{size}</cq-item>)}
		</cq-menu-dropdown>;

		this.lineStyleMenu = <cq-menu-dropdown class="ciq-line-style-menu">
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
	}

	render() {
		this.buildLists();
		const { magnet } = this.context.stx.preferences;
		const magnetClass = `ciq-mini-widget ciq-magnet 
			${magnet ? 'active' : ''} 
			${magnet > 1 ? '' : 'strong'}`;

		const cvpTemplate = 
			<>
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
				{this.lineStyleMenu}
			</cq-menu>
			</cq-line-style>
			</>;

		return (
			<cq-palette-dock cq-publish-size-changes={ this.props['publish-size-changes']} ref={this.paletteDock}>
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
									{this.groupDropdown}
								</cq-menu>
							</div>
							<cq-separator></cq-separator>
							<div className="tool-group" tool-group-filter="all">
								<cq-scroll cq-no-resize>{this.drawingToolItems}</cq-scroll>
								<cq-separator></cq-separator>
								<div className="mini-widget-group mini-widget-foot">
									<cq-toggle class={magnetClass} cq-member="preferences.magnet" cq-toggles="true,75,false" ref={this.magnetToggle}><span className="icon magnet"></span><label>Magnet</label></cq-toggle>
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
												{this.lineStyleMenu}
											</cq-menu>
										</cq-line-style>
									</div>

									<cq-cvp-controller cq-section cq-cvp-header="1"></cq-cvp-controller>
									<cq-cvp-controller cq-section cq-cvp-header="2"></cq-cvp-controller>
									<cq-cvp-controller cq-section cq-cvp-header="3"></cq-cvp-controller>
									<template cq-cvp-controller="true">
										{cvpTemplate}
									</template>
									<cq-annotation cq-section="true">
										<cq-annotation-italic stxtap="toggleFontStyle('italic')" class="ciq-btn" style={{fontStyle:"italic"}}>I</cq-annotation-italic>
										<cq-annotation-bold stxtap="toggleFontStyle('bold')" class="ciq-btn" style={{fontWeight:"bold"}}>B</cq-annotation-bold>
										<cq-menu class="ciq-select">
											<span cq-font-size="true">12px</span>
											{this.fontSizeMenu}
										</cq-menu>
										<cq-menu class="ciq-select">
											<span cq-font-family="true">Default</span>
											{this.fontFamilyMenu}
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
		);
	}
}

PaletteDrawing.contextType = ChartContext;
