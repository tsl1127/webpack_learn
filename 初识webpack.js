webpack默认配置文件webpack.config.js
可以通过webpack --config指定配置文件


module.exports = {
    entry:'./src/index.js',      //入口文件
    output: './dist/main.js',   //打包输出
    mode: 'production',   //环境
    module: {
        rules:[                       //loader配置
            {test:/\.txt$/, use: 'raw-loader'}
        ]
    },
    plugins:[                 //plugin插件
        new HtmlwebpackPlugin({
            template:'./src/index.html'
        })
    ]
}