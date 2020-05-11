import React from 'react';
import { CIQ } from 'chartiq/js/chartiq';
import { ChartContext } from '../../context/ChartContext';

/**
 * Chart menu component `<ContextMenuDrawing>`
 *
 * Contextual menu which provides additional settings for elements drawn using the {@link PaletteDrawing} component.
 *
 * @export
 * @class ContextMenuDrawing
 * @extends {React.Component}
 */
export default class ContextMenuDrawing extends React.Component {

	componentDidMount() {
		const UIContext = this.context.UIContext;
		const UIDrawingEdit = new CIQ.UI.DrawingEdit(null, UIContext);

		UIDrawingEdit.preventAutoClose = true;

		UIDrawingEdit.node.addEventListener(
			'drawing-edit-begin',
			function(event) {
				if (document.body.classList.contains('toolbar-on')) return;
				UIDrawingEdit.preventAutoClose = false;

				const drawToggles = UIContext.topNode.querySelectorAll('.ciq-draw');
				drawToggles.forEach(toggle => toggle.priorVectorType = event.detail.tool);
				drawToggles.forEach(toggle => toggle.set(true));
			},
			false
		);

		UIDrawingEdit.node.addEventListener(
			'drawing-edit-end',
			function(event) {
				if (UIDrawingEdit.preventAutoClose) return;
				if (event.detail.action !== 'edit')
					UIDrawingEdit.preventAutoClose = true;
				if (event.detail.action !== 'close') return;

				UIContext.topNode.querySelectorAll('.ciq-draw')
					.forEach(toggle => toggle.set(false));
			},
			false
		);

		this.UIDrawingEdit = UIDrawingEdit;
	}

	componentWillUnmount() {
		let stx = this.context.stx;
		if (this.UIDrawingEdit.drawingCB)
			stx.removeEventListener(this.UIDrawingEdit.drawingCB);
		if (this.UIDrawingEdit.drawingEditCB)
			stx.removeEventListener(this.UIDrawingEdit.drawingEditCB);
	}

	render() {
		return (
			<cq-dialog>
				<cq-drawing-context>
					<div stxtap="DrawingEdit.edit()">Edit Settings</div>
					<div stxtap="DrawingEdit.clone()">Clone Drawing</div>
					<cq-menu
						stxtap="resize()"
						cq-close-top="cq-dialog[cq-drawing-context]"
					>
						<cq-menu-dropdown cq-no-scroll="true" class="context-menu-right">
							<cq-item stxtap="DrawingEdit.reorderLayer('top')">
								Bring to Top
							</cq-item>
							<cq-item stxtap="DrawingEdit.reorderLayer('up')">
								Bring Forward
							</cq-item>
							<cq-item stxtap="DrawingEdit.reorderLayer('down')">
								Send Backward
							</cq-item>
							<cq-item stxtap="DrawingEdit.reorderLayer('bottom')">
								Send to Bottom
							</cq-item>
						</cq-menu-dropdown>

						<div>
							Layer Management<div className="context-button-right-arrow"></div>
						</div>
					</cq-menu>
					<div stxtap="DrawingEdit.remove()">Delete Drawing</div>
				</cq-drawing-context>
			</cq-dialog>
		);
	}
}

ContextMenuDrawing.contextType = ChartContext;
