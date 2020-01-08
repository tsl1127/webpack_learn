'use strict'

const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
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

module.exports = {
    entry: entry,
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
    ].concat(htmlWebpackPlugins),
    devServer:{
        contentBase:'./dist',
        hot:true,
        stats: 'errors-only'
    },
    // devtool:'source-map'
    devtool: 'cheap-source-map'  //只能看到行，看不到列


}