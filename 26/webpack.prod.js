'use strict'

const glob = require('glob')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')  //注意版本的原因
const setMPA = ()=>{
    const entry = {

    }
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname,'./src/*/index.js'))
    // console.log(entryFiles,'entryFiles')
    Object.keys(entryFiles).map((index)=>{
        const entryFile = entryFiles[index]
        // console.log(entryFile,'entryFile')
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        // console.log(match,'match')
        const pageName = match && match[1]
        entry[pageName] = entryFile
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({  //一个页面对应一个
                template:path.join(__dirname,`src/${pageName}/index.html`),
                filename:`${pageName}.html`,  //打包出来的文件名称
                chunks:[pageName],  //指定生成的html使用哪个chunk
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
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}

const {entry, htmlWebpackPlugins} = setMPA()
console.log(entry,'entry')

module.exports = {
    entry:entry,
    output: {
        path: path.join(__dirname,'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode:'none',
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
                    },
                    {
                        loader:'px2rem-loader',
                        options:{
                            remUnit:  75, //rem相对px转换的单位，这里表示1个rem代表75px
                            remPrecision: 8 //px转换为rem时的小数点的位数
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
        
        new CleanWebpackPlugin()
    ].concat(htmlWebpackPlugins),
    // devtool:'eval'
    // devtool: 'source-map'
    devtool: 'inline-source-map'
}