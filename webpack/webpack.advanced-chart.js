const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    devServer:{
        publicPath: '/'
    },
    entry: {
        bundle: path.join(__dirname, '..', 'src', 'advanced.js')
    },
    output: {
        chunkFilename: '[name].bundle.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'AdvancedChart',
            filename: path.join(__dirname, '..', 'dist', 'index.html'),
            template: path.join(__dirname, '..', 'index.html'),
        }),
    ]
}