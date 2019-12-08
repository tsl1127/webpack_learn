'use strict'

const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')  //注意版本的原因

module.exports = {
    entry:{
        index: './src/index.js',
        search:'./src/search.js'
    },
    output: {
        path: path.join(__dirname,'dist'),
        filename: '[name].js'
    },
    // mode:'production',
    mode:"development",
    module:{
        rules:[
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use:[
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|svg|gif)$/,
                // use: "file-loader"
                use:[
                    {
                        loader: 'url-loader',
                        options: {
                            limit:10240   //小于10K的大小的图片会自动base64处理
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    ],
    devServer:{
        contentBase:'./dist',
        hot:true
    }
}