import React from 'react';

import {default as ActiveTraderWorkstation} from './ActiveTraderWorkstation';
import tfcHtml from "chartiq/plugins/tfc/tfcHtml";

import { config } from './resources'; // ChartIQ library resources
import './ActiveTraderWorkstation.css';

export default function({chartInitialized}){
  return (
    <ActiveTraderWorkstation config={config} chartInitialized={chartInitialized} tfcTemplate={tfcHtml} />
  );
}