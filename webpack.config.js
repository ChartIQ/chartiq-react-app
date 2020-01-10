const merge = require('webpack-merge')

const configs = {
    common: require('./webpack/webpack.common.js'),

    advanced: require('./webpack/webpack.advanced-chart.js'),
    marketDepth: require('./webpack/webpack.market-depth.js'),
    orderbook: require('./webpack/webpack.orderbook.js'),
    unified: require('./webpack/webpack.unified.js')
}

module.exports = env => {
    let environment, build
    let extras = {}

    console.log("Webpack env: ", env)
    if(env) {
        environment = env.production ? 'production' : 'development'
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
    
    console.log('final merged webpack config: ',output)

    return output  
}