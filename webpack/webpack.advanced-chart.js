const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        bundle: path.join(__dirname, '..', 'src', 'advanced.js')
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'AdvancedChart',
            template: path.join(__dirname, '..', 'advanced-chart.html'),
        }),
    ]
}