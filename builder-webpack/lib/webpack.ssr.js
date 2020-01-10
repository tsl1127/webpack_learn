const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const prodConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'ignore-loader'  //在SSR里CSS不进行解析
            },
            {
                test: /\.less$/,
                use: 'ignore-loader'  //在SSR里LESS不进行解析
            },
        ]
    },
    plugins: [
        new OptimizeCssAssetsPlugin({  //压缩
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new HtmlWebpackExternalsPlugin({  //公共资源包提取出来
            externals: [
                {
                    module: 'react',
                    entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
                    global: 'React'
                },
                {
                    module: 'react-dom',
                    entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
                    global: 'ReactDOM'
                },
            ]
        }),
    ],
    optimization: {  //提取common js
        splitChunks: {
            minSize: 0,  //只要有引用就打包到commons里,0代表引入的容量大小
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2  //要求最少引用的次数是2次才打包
                }
            }
        }
    }
}

module.exports = merge(baseConfig, prodConfig)