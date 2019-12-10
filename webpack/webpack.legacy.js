const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        bundle: path.join(__dirname, '..', 'src', 'polyfill')
    },
    resolve: {
        alias: {
            'chartiq/js/components': path.join('chartiq', 'ES5-support', 'js', 'components'),
            'chartiq/js/componentUI': path.join('chartiq', 'ES5-support', 'js', 'componentUI'),
            'chartiq/plugins/cryptoiq/orderbook': path.join('chartiq', 'ES5-support', 'plugins', 'cryptoiq', 'orderbook'),
            'chartiq/plugins/cryptoiq/tradehistory': path.join('chartiq', 'ES5-support', 'plugins', 'cryptoiq', 'tradehistory'),
        },
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'AdvancedChart',
            filename: path.join(__dirname, '..', 'dist', 'index.html'),
            template: path.join(__dirname, '..', 'index.html'),
        }),
    ]
}