const merge = require('webpack-merge')

const common = require('./webpack/webpack.common.js')
const legacy = require('./webpack/webpack.legacy.js')

const advanced = require('./webpack/webpack.advanced-chart.js')
const marketDepth = require('./webpack/webpack.market-depth.js')
const orderbook = require('./webpack/webpack.orderbook.js')
const unified = require('./webpack/webpack.unified.js')


module.exports = env => {
    let output = merge(common, unified)
    let environment = env.production ? 'production' : 'development'
    let polyfill = env.production === 'polyfill' ? true : false

    if(polyfill) merge(output, legacy)
    console.log(output)

    return output  
}