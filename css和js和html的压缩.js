js文件的压缩
内置了uglifyjs-webpack-plugin

css文件的压缩
使用optimize-css-assets-webpack-plugin
同时使用cssnano//css处理器




例子
plugins:[
    new OptimizeCssAssetsPlugin({
        assetNameRegExp:/\.css$/g,
        cssProcessor:require('cssnano')
    })
]

html文件的压缩
修改html-webpack-plugin  设置压缩参数


new HtmlWebpackPlugin({
    template:path.join(__dirname,'src/search.html'),
    filename:'search.html',
    chunks:['search'],
    inject:true,
    minify:{
        html5:true,
        collapseWhitespace:true,
        preserveLineBreaks:false,
        minifyCSS:true,
        nimifyJS:true,
        removeComments:false
    }
})