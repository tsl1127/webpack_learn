现象：构建后的代码存在大量闭包代码


会导致的问题：
大量函数闭包包裹代码，导致体积增大（模块越多越明显）
运行代码时创建的函数作用域变多，内存开销变大


模块转换分析
被webpack转换后的模块会带上一层包裹
import会被转换成__webpack_require

scope-hoisting原理
原理：将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止命名冲突

对比：通过scope-hoisting可以减少函数声明代码和内存开销


webpack mode为production默认开启
必须是es6语法，CJS不支持
