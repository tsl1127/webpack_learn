资源并行解析可选方案

thread-loader 
parallel-webpack 
HappyPack


HappyPack解析资源
原理：每次webpack解析一个模块，HappyPack会将它及它的依赖分配给worker线程中


使用webpack自带的thread-loader解析资源
原理：每次webpack解析一个模块，thread-loader会将它及它的依赖分配给worker线程中


