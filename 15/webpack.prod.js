'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry:{
        index: './src/index.js',
        search:'./src/search.js'
    },
    output: {
        path: path.join(__dirname,'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode:'production',
    module:{
        rules:[
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|svg|gif)$/,
                // use: "file-loader"
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            // limit:10240   
                            name:'[name]_[hash:8][ext]'
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                // use: "file-loader"
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            // limit:10240   
                            name:'[name]_[hash:8][ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({   //不能与style-loader一起使用
            filename:'[name]_[contenthash:8].css'
        })
    ]
}