import React from "react";

import "./ShortcutDialog.css";

/**
 * Custom component that adds a drawing tools keyboard shortcut settings dialog.
 *
 * @export
 * @class ShortcutDialog
 * @extends {React.Component}
 */
export default class ShortcutDialog extends React.Component {
	constructor(props) {
		super(props);

		this.onClose = props.closeDialog;

		this.state = {
			drawingTools: props.drawingToolsInfo,
			selectedTool: {}
		};
	}

	componentDidMount() {}

	shortcutChanged(tool, e) {
		if (e) {
			e.stopPropagation();
			e.preventDefault();
		}

		const tools = this.state.drawingTools.slice();
		const shortcut = event.target.value;
		tools
			.filter((item) => item.tool === tool)
			.map((item) => (item.shortcut = shortcut));

		this.setState({ drawingTools: tools });

		this.updateDuplicates();
	}

	infoAbout(tool) {
		let selectedTool =
			this.state.drawingTools.find((item) => item.tool === tool) || {};
		this.setState({ selectedTool: selectedTool });
	}

	updateDuplicates() {
		const tools = this.state.drawingTools.slice();
		// find duplicates
		const duplicates = tools.reduce((acc, item, index) => {
			item.duplicate = false; // clear duplicates
			if (!item.shortcut) return acc;
			acc[item.shortcut] = (acc[item.shortcut] || []).concat(index);
			return acc;
		}, {});

		// mark duplicates
		Object.entries(duplicates).forEach(([shortcut, indexes]) => {
			if (indexes.length > 1) {
				indexes.forEach((index) => (tools[index].duplicate = true));
			}
		});

		this.setState({ drawingTools: tools });
	}

	sortBy(field) {
		let tools = this.state.drawingTools.slice();
		tools.sort((a, b) => {
			const x1 = a[field];
			const x2 = b[field];
			if (!x1 && x2) return 1;
			if (!x2 && x1) return -1;
			return x1 > x2 ? 1 : -1;
		});

		this.setState({ drawingTools: tools });
	}

	onSave() {
		const shortcuts = this.state.drawingTools
			.filter((item) => item.shortcut)
			.reduce((acc, item) => {
				acc[item.tool] = item.shortcut;
				return acc;
			}, {});

		this.props.setDrawingToolShortcuts(shortcuts);
		this.onClose();
	}

	render() {
		let descriptionTable = this.state.drawingTools.map((item, index) => {
			return (
				<tr key={index}>
					<td
						className='label'
						onClick={(event) => {
							this.infoAbout(item.tool);
						}}
					>
						{item.label}
					</td>
					<td className='shortcut'>
						<input
							type='text'
							maxLength='1'
							value={item.shortcut}
							onChange={(event) => {
								this.shortcutChanged(item.tool, event);
							}}
							className={item.duplicate ? "duplicate" : ""}
						/>
					</td>
				</tr>
			);
		});

		let selectedToolLabel =
			this.state.selectedTool.label || "No tool has been selected";
		let selectedToolDetail = this.state.selectedTool.detail || "";

		return (
			<div className='shortcut-dialog'>
				<div className='container'>
					<div className='title'>Drawing tool shortcuts</div>
					<div className='content'>
						<div className='list'>
							<table>
								<tbody>
									<tr>
										<td
											title='Sort by label'
											onClick={(event) => {
												this.sortBy("label");
											}}
										>
											Label
										</td>
										<td
											title='Sort by shortcut'
											onClick={(event) => {
												this.sortBy("shortcut");
											}}
										>
											Alt + Shortcut
										</td>
									</tr>
									{descriptionTable}
								</tbody>
							</table>
						</div>

						<div className='detail'>
							Detail about Tool: <b>{selectedToolLabel}</b>
							<div>{selectedToolDetail}</div>
						</div>
					</div>
					<div className='action'>
						<button
							onClick={(event) => {
								this.onSave();
							}}
						>
							Save
						</button>
						<button onClick={this.onClose}>Close</button>
					</div>
				</div>
			</div>
		);
	}
}
