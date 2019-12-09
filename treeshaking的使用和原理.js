摇树优化
一个模块可能有多个方法，只要其中的某个方法使用到了，则整个文件都会被打到bundle里去，tree-shaking就是只把用到的方法打入bundle里去，没用到的方法会在uglify阶段被擦除掉

使用：webpack默认支持，在.babelrc里设置modules:false即可
 .production mode的情况下默认开启

 要求：必须支持es6语法，CJS的不支持


 DCE(elimination)的概念

 代码不可被执行，不可到达                        if(false) {
                                                    console.log('这段代码永远不会被执行')
                                            }
 代码执行的结果不会被用到
 代码只会影响死变量（只写不读）


 另外注意：编写的代码要没有副作用，否则tree-shaking也会失效
 