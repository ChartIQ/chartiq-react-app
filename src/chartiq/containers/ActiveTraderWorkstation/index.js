import React from 'react';
import {default as ActiveTraderWorkstation} from './ActiveTraderWorkstation';
import { config } from './resources'; // ChartIQ library resources

export default function({chartInitialized}){
  return (
    <ActiveTraderWorkstation config={config} chartInitialized={chartInitialized} />
  );
}