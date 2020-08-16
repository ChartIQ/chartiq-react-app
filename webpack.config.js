const merge = require('webpack-merge')

const configs = {
    common: require('./webpack/webpack.common.js'),
    advanced: require('./webpack/webpack.advanced-chart.js')
}

module.exports = env => {
    let environment
    let extras = {}

    console.log("Webpack env: ", env)
    if(env)
        environment = env.production ? 'production' : 'development'
    else
        environment = 'development'

    extras.mode = environment
    extras.devtool = environment === 'development' ? 'source-maps' : ''
    
    let output = merge(configs.common, configs.advanced, extras)
    
    console.log('final merged webpack config: ',output)

    return output  
}
