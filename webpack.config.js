const merge = require('webpack-merge')

const configs = {
    common: require('./webpack/webpack.common.js'),
    legacy: require('./webpack/webpack.legacy.js'),

    advanced: require('./webpack/webpack.advanced-chart.js'),
    marketDepth: require('./webpack/webpack.market-depth.js'),
    orderbook: require('./webpack/webpack.orderbook.js'),
    unified: require('./webpack/webpack.unified.js')
}

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
    if(polyfill) {
        console.log('legacy config: ',configs.legacy)
        output = merge(output, configs.legacy)
    }
    console.log('final merged webpack config: ',output)

    return output  
}