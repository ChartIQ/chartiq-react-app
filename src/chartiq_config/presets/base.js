import '../../chartiq';
import { CIQ } from 'chartiq/js/chartiq';

import '../../chartiq/styles/base-imports'; // css styles

import 'chartiq/js/addOns';
import 'chartiq/js/components';

import PerfectScrollbar from "chartiq/js/thirdparty/perfect-scrollbar.esm.js";

CIQ.UI.scrollbarStyling = {
	refresh(component) {
		if (!component.__ps) component.__ps = new PerfectScrollbar(component, {suppressScrollX:true});
		component.__ps.update(component);
	}
}

export { CIQ };
