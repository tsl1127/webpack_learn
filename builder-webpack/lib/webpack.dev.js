
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const devConfig = {
    mode: "development",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        stats: 'errors-only'
    },
    // devtool:'source-map'
    devtool: 'cheap-source-map'  //只能看到行，看不到列
}

module.exports = merge(baseConfig, devConfig)