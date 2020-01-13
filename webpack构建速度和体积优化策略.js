初级分析：使用webpack内置的stats
stats：构建的统计信息

package.json中使用stats
scripts:{
    "build:stats":"webpack --env production --json > stats.json"
}

方法二：在node.js中使用 


48、速度分析 ：使用speed-measure-webpack-plugin 

可以看到每次插件和loader的耗时

速度分析插件作用
    分析整个打包总耗时
    每个插件和loader的耗时情况



体积分析：webpack-bundle-analyzer

构建后会在8888端口展示大小


可以分析哪些问题？
    依赖的第三方模块文件大小
    业务里面的组件代码大小
