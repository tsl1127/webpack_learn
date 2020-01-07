const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: "none", //生产环境会压缩
    entry: {
        "large-number": './src/index.js',
        "large-number.min": './src/index.js'
    },
    output: {
        filename: '[name].js',
        library: 'largeNumberTsl', //库的名字
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({  //压缩插件  
                include: /\.min\.js$/
            })
        ]
    }
}