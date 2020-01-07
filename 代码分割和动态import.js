代码分割的意义
对于大型的web应用，将所有的代码放在一个文件夹显然是不够有效的，特别是当你的某些代码块在某些特殊的时候才会被使用到，webpack有个功能就是将你的代码库分割成chunks（语块），当代码运行到需要它们的时候再进行加载

适用场景：
抽离相同代码到一个共享块
脚本懒加载，使得初始下载的代码更小

懒加载js脚本的方式

CommonJS: require.ensure

ES6: 动态import（目前还没有原生支持，需要babel转义）

如何使用动态import
安装babel插件

npm install @babel/plugin-syntax-dynamic-import -D

ES6:动态import 
{
    "plugins":["@babel/plugin-syntax-dynamic-import"]
}

webpack里本身是通过jsonp来动态创建script标签来引入js脚本