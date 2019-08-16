const merge = require('webpack-merge')

const configs = {}
configs["common"] = require('./webpack/webpack.common.js')
configs["legacy"] = require('./webpack/webpack.legacy.js')

configs["advanced"] = require('./webpack/webpack.advanced-chart.js')
configs["marketDepth"] = require('./webpack/webpack.market-depth.js')
configs["orderbook"] = require('./webpack/webpack.orderbook.js')
configs["unified"] = require('./webpack/webpack.unified.js')

module.exports = env => {
    let environment, polyfill, build
    let extras = {}

    console.log("Webpack env: ", env)
    if(env) {
        environment = env.production ? 'production' : 'development'
        polyfill = env.production === 'polyfill' ? true : false
        build = configs[env.build]
    }
    else {
        environment = 'development'
        build = configs.advanced
    }
    
    console.log(build)

    extras.mode = environment
    extras.devtool = environment === 'development' ? 'source-maps' : ''
    
    let output = merge(configs.common, build, extras)
    if(polyfill) merge(output, configs.legacy)
    console.log(output)

    return output  
}