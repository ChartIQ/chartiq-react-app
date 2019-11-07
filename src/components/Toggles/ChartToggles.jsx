import React from 'react'
import ToggleCrosshair from './ToggleCrosshair'
import ToggleDrawing from './ToggleDrawing'
import { ChartContext } from '../../react-chart-context'
import ToggleHUD from './ToggleHUD'

/**
 * Component that holds other toggle components. `<ChartToggles />`
 *
 * Also contains a toggle for displaying toggles in sidenav for mobile
 *
 * @export
 * @class ChartToggles
 * @extends React.Component
 */
export default class ChartToggles extends React.Component {

	constructor() {
		super()
		this.sidenav = React.createRef();
		this.toggleSidenav = React.createRef();
	}

	componentDidMount () {
		let chart = this.context.stx.container
		let ciqChart = chart.parentElement
		let sidenavRef = this.sidenav.current

		this.toggleSidenav.current.registerCallback(function (value) {
			var stx=this.context.stx, rightPx;
			var sidePanelWidth = 0;
			if (value === 'sidenavOn') {
				this.node.addClass("active");
				stx.layout.sidenav = "sidenavOn";
				sidenavRef.classList.add("active");
				rightPx=this.node.width()+sidePanelWidth;
			} else if (value === 'sidenavOff') {
				rightPx=sidePanelWidth;
				this.classList.remove("active");
				sidenavRef.classList.remove("active");
				stx.layout.sidenav = "sidenavOff";
			}
			ciqChart.parentElement.style.marginRight = rightPx +'px';
			stx.resizeChart();
		});

		// Trigger a window resize event after sidenav is reendered to add/remove appropriate css classes
		// window.dispatchEvent(new Event('resize'));
		window.addEventListener("resize", this.resizeScreen.bind(this));
		this.resizeScreen();
	}

	resizeScreen(){
		let containerWidth = document.querySelector('.cq-chart-container').offsetWidth;

		if (containerWidth > 584) {
			this.sidenav.current.classList.remove('sidenav','active');
			this.sidenav.current.classList.add('ciq-toggles');
			this.context.stx.layout.sidenav = 'sidenavOff';
		} else {
			this.sidenav.current.classList.remove('ciq-toggles');
			this.sidenav.current.classList.add('sidenav');
		}
	}

	render () {
		const hud = this.context.UIContext.UIHeadsUpStatic && <ToggleHUD />
		return (
			<>
		<div className="sidenav-toggle ciq-toggles">
			<cq-toggle class="ciq-sidenav" cq-member="sidenav" cq-toggles="sidenavOn,sidenavOff" ref={this.toggleSidenav}><span></span>
				<cq-tooltip>More</cq-tooltip>
			</cq-toggle>
		</div>

		<div className="icon-toggles ciq-toggles" ref={this.sidenav}>
			<ToggleDrawing />
			<ToggleCrosshair />
			{ hud }
		</div>
		</>
		)
	}
}

ChartToggles.contextType = ChartContext; 
