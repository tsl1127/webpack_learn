文件监听是发现源码发生变化时，自动重新构建出新的输出文件
开启监听模式有2种：
    启动webpack时，带上--watch参数
    在配置webpack.config.js中设置watch:true


    比如
    scripts: {
        'watch':"webpack--watch"
    }

    缺陷：每次需要手动刷新浏览器


    原理分析：
    轮询判断文件的最后编辑时间是否变化
    某个文件发生了变化，并不会立即告诉监听者，而是先缓存起来，等aggregateTimeout,

    module.exports = {
        watch: true,   //默认false
        watchOptions: {
            ignored: /node_modules/,   //默认为空，表示不监听的文件或文件夹，支持正则匹配
            aggregateTimeout: 300,  // 监听到变化后等300ms后再去执行
            poll:1000  //判断文件是否发生变化是通过不停询问系统指定文件有么有发生变化实现的，默认每秒询问1000次
        }
    }