基础库分离
思路：将react、react-dom基础包通过cdn引入，不打入bundle中

方法：使用html-webpack-externals-plugin




利用SplitChunksPlugin 进行公共脚本分离

webpack4内置的，替代CommonsChunkPlugin插件

chunks参数说明：
    async 异步引入的库进行分离（默认）
    initial 同步引入的库进行分离
    all  所有引入的库进行分离（推荐）


利用SplitChunksPlugin分离基础包
test:匹配出需要分离的包

利用SplitChunksPlugin分离页面公共文件
minChunks 设置最小引用次数为2次
miniSize:分离的包体积的大小

