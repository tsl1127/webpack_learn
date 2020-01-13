初级分析：使用webpack内置的stats
stats：构建的统计信息

package.json中使用stats
scripts:{
    "build:stats":"webpack --env production --json > stats.json"
}

方法二：在node.js中使用 


