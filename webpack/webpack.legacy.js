const path = require('path')
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
            'chartiq/plugins/scriptiq/scriptiq': path.join('chartiq', 'ES5-support', 'plugins', 'scriptiq', 'scriptiq'),
            'chartiq/plugins/scriptiq/scriptiq-editor': path.join('chartiq', 'ES5-support', 'plugins', 'scriptiq', 'scriptiq-editor'),
            'chartiq/plugins/scriptiq/scriptiq-menu': path.join('chartiq', 'ES5-support', 'plugins', 'scriptiq', 'scriptiq-menu'),
        },
    }
}