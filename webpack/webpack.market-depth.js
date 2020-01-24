const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        bundle: path.join(__dirname, '..', 'src', 'chartiq', 'examples', 'marketdepth.js')
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'MarketDepth',
            template: path.join(__dirname, '..', 'index.html'),
            chunks: ['bundle']
        }),
    ]
}