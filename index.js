import 'react'
import { CIQ } from 'chartiq'
// import * as chartiq from 'chartiq'

// let library = chartiq.library.CIQ
console.log(CIQ)
// console.log(addOns)

let container = window.document.querySelector('.chartContainer')
// let stxx = new library.STXChart({container: container})
window.stxx = new CIQ.ChartEngine({container: container})

console.log(CIQ)
// console.log(CIQ.RangeSlider)
stxx.newChart('SPY', sampleData)
// new CIQ.RangeSlider({stx:stxx});
// stxx.attachQuoteFeed(quoteFeedSimulator, {refreshInterval: 5, bufferSize: 200})