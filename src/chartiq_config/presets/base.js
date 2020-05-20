import '../../chartiq';
import { CIQ } from 'chartiq/js/chartiq';

import '../../chartiq/styles/base-imports'; // css styles

import 'chartiq/js/addOns';
import 'chartiq/js/components';

import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";

CIQ.UI.scrollbarStyling = {
	enabled: true,
	init: (component) => new PerfectScrollbar(component, {suppressScrollX:true}),
	update: (component) => component.scrollRenderer.update()
}


export { CIQ };