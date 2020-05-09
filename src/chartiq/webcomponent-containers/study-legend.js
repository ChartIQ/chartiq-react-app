/**
 * Study legend container provides markup and sidesteps template creation issue in React
 */
export class StudyLegendContainer extends HTMLElement {
	connectedCallback() {
		setTimeout(() => this.initInner());
	}

	initInner() {
		if (!this.firstChild) {
			this.innerHTML = `
				<cq-study-legend cq-no-close>
					<cq-section-dynamic>
						<cq-study-legend-content>
							<cq-heading>Current Studies</cq-heading>
							<template id="currentStudies">
								<cq-item>
									<cq-label class="click-to-edit"></cq-label>
									<div class="ciq-icon ciq-close"></div>
								</cq-item>
							</template>
						</cq-study-legend-content>
						<cq-placeholder>
							<div stxtap="Layout.clearStudies()" class="ciq-btn sm">Clear All</div>
						</cq-placeholder>	
					</cq-section-dynamic>
				</cq-study-legend>
			`;
		}
	}
}

customElements.define('cq-study-legend-container', StudyLegendContainer);
