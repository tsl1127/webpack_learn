热更新：webpack-dev-server

WDS不刷新浏览器
不输出文件，而是放在内存中
使用HotModuleReplacementPlugin插件

dev:"webpack-dev-server --open"

--open参数是每次构建完成后自动开启浏览器
主要是在开发环境用，在生产环境是不需要的


虽然webpack自带webpack-dev-server，但是如果出现运行package.json里的npm run dev报错（webpack-dev-server不是内部命令），则需要单独安装webpack-dev-server包


方式二：
使用webpack-dev-middleware
WDM将webpack输出的文件传输给服务器
适用于灵活的定制场景


const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler,{
    publicPath:config.output.publicPath
}))

app.listen(3000, function(){
    console.log("example app listen on port 3000")
})

热更新原理
