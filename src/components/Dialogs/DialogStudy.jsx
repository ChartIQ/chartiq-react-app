import React from 'react'

/**
 * Study dialog component `<DialogStudy/>`
 * 
 * Displays dialog to edit and manage selected study in library entry
 * (inputs, outputs, parameters, etc).
 *
 * @export
 * @class DialogStudy
 * @extends {React.Component}
 */
export default class DialogStudy extends React.Component {

	render() {
		return (
<>
<cq-dialog>
	<cq-study-dialog cq-study-axis cq-study-panel>
		<h4 className="title">Study</h4>
		<cq-scroll cq-no-maximize>
			<cq-study-inputs>
				<template cq-study-input="true" className="cq-study-input">
					<cq-study-input>
						<div className="ciq-heading"></div>
						<div className="stx-data">
							<template cq-menu="true" className="cq-menu">
								<cq-menu class="ciq-select">
									<cq-selected></cq-selected>
									<cq-menu-dropdown cq-lift></cq-menu-dropdown>
								</cq-menu>
							</template>
						</div>
					</cq-study-input>
					<hr />
				</template>
			</cq-study-inputs>
			<cq-study-outputs>
				<template cq-study-output="true">
					<cq-study-output>
						<div className="ciq-heading"></div>
						<cq-swatch cq-overrides="auto"></cq-swatch>
					</cq-study-output>
					<hr/>
				</template>
			</cq-study-outputs>
			<cq-study-parameters>
				<template cq-study-parameters="true">
					<cq-study-parameter>
						<div className="ciq-heading"></div>
						<div className="stx-data"><cq-swatch cq-overrides="auto"></cq-swatch>
							<template cq-menu="true">
								<cq-menu class="ciq-select">
									<cq-selected></cq-selected>
									<cq-menu-dropdown cq-lift></cq-menu-dropdown>
								</cq-menu>
							</template>
						</div>
					</cq-study-parameter>
					<hr />
				</template>
			</cq-study-parameters>
		</cq-scroll>
		<div className="ciq-dialog-cntrls">
			<div className="ciq-btn" stxtap="close()">Done</div>
		</div>
	</cq-study-dialog>
</cq-dialog>
</>
		)
	}
}
