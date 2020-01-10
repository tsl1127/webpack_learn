smoke testing

冒烟测试执行
构建是否成功
每次构建完成build目录是否有内容输出
    是否有JS、CSS等静态资源文件
    是否有HTML文件

判断构建是否成功
    在示例项目里面运行构建，看看是否有报错

判断基本功能是否正常
    编写mocha测试用例
        是否有JS、CSS等静态资源文件
        是否有HTML文件  

运行node test/smoke/index.js
这个步骤是:先删掉template里的dist，然后采用lib里的打包配置对template里的src里的示例进行打包，然后看看打包的结果

