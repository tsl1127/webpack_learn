如何判断构建是否成功
在CI/CD的pipline或者发布系统需要知道当前构建状态
每次构建完后输入echo $?获取错误码

webpack4之前的版本构建失败不会抛出错误码error code 

Node.js中的process.exit规范
    0表示成功完成，回调函数中，err为null
    非0表示执行失败，回调函数中，err不为null ，err.code就是传给exit的数字

如何主动捕获并处理构建错误？
compiler在每次构建结束后会触发done这个hook
process.exit主动处理构建报错

