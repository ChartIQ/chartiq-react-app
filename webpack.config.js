const merge = require('webpack-merge')

const common = require('./webpack/webpack.common.js')
const legacy = require('./webpack/webpack.legacy.js')

const advanced = require('./webpack/webpack.advanced-chart.js')
const marketDepth = require('./webpack/webpack.market-depth.js')
const orderbook = require('./webpack/webpack.orderbook.js')
const unified = require('./webpack/webpack.unified.js')


module.exports = env => {
    let environment, polyfill
    let extras = {}
    

    console.log("Webpack env: ", env)
    if(env) {
        environment = env.production ? 'production' : 'development'
        polyfill = env.production === 'polyfill' ? true : false
    }
    else environment = 'development'
    
    extras.mode = environment
    extras.devtool = environment === 'development' ? 'source-maps' : ''
    
    let output = merge(common, unified, extras)
    if(polyfill) merge(output, legacy)
    console.log(output)

    return output  
}