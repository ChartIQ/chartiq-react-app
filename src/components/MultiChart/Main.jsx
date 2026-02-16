import React from 'react';
import MultiChartExample from "./MultiExample";

const Main = () => {
  return (
    <MultiChartExample config={{
        plugins: { tfc: null, marketDepth: null, studyBrowser: null },
        menuStudiesConfig: { excludedStudies: { DoM: true } }
    }} />
  )
}
export default Main;