import 'chartiq/js/thirdparty/perfect-scrollbar.jquery.js';
import 'chartiq';

import 'chartiq/js/addOns';

import 'chartiq/plugins/cryptoiq/cryptoiq';

import 'chartiq/plugins/tfc/tfc-loader';
// // Be sure to load some account file or TFC will not work
import 'chartiq/plugins/tfc/tfc-demo';
import 'chartiq/plugins/scriptiq/scriptiq';

import 'chartiq/plugins/timespanevent/timespanevent';
import 'chartiq/plugins/timespanevent/examples/timeSpanEventSample';
import _config from './_config';

export { default as AdvancedChart } from './containers/AdvancedChart';
export { default as defaultConfig, getDefaultConfig } from './_config';
