'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')  //注意版本的原因

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
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options:{
                            plugins:()=>[
                                require('autoprefixer')({
                                    browsers:['last 2 version','>1%','ios 7']  //兼容的浏览器版本
                                })
                            ]
                        }
                    }
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
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require('cssnano')
        }),
        new HtmlWebpackPlugin({  //一个页面对应一个
            template:path.join(__dirname,'src/search.html'),
            filename:'search.html',  //打包出来的文件名称
            chunks:['search'],  //指定生成的html使用哪个chunk
            inject:true,  //打包出来的css、js会自动的注入到html里面
            minify:{
                html5:true,
                collapseWhitespace:true,
                preserveLineBreaks:false,
                minifyCSS:true,
                nimifyJS:true,
                removeComments:false
            }
        }),
        new HtmlWebpackPlugin({  //一个页面对应一个
            template:path.join(__dirname,'src/index.html'),
            filename:'index.html',  //打包出来的文件名称
            chunks:['index'],  //指定生成的html使用哪个chunk
            inject:true,  //打包出来的css、js会自动的注入到html里面
            minify:{
                html5:true,
                collapseWhitespace:true,
                preserveLineBreaks:false,
                minifyCSS:true,
                nimifyJS:true,
                removeComments:false
            }
        }),
        new CleanWebpackPlugin()
    ]
}