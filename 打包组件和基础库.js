webpack除了可以用来打包应用，还可以打包js库
实现一个大整数加法库的打包
    需要打包压缩版和非压缩版本
    支持AMD/CJS/ESM模块引入


    库的目录结构和打包要求
    打包输出的库名称
        未压缩版 large-number.js 
        压缩版large-number.min.js 

    /dist 
        large-number.js 
        large-number.min.js 
    webpack.config.js 
    package.json
    index.js 
    /src 
     index.js 

     支持的使用方式
    支持ES module AMD/CMD 

    可以直接通过script引入

如何将库暴露出去？
library:指定库的全局变量
libraryTarget：指定库引入的方式

output:{
    filename:"[name].js",
    library:"largeNumber",
    libraryExport:"default",
    libraryTarget:"umd"
}


如何对.min压缩
通过include设置只压缩min.js结尾的文件


设置入口文件
package.json的main字段为index.js
index.js里写配置

