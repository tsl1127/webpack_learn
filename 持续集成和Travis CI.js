持续集成的作用
    优点：
        快速发现错误
        防止分支大幅偏离主干


核心措施是：代码集成到主干之前，必须通过自动化测试，只要有一个测试用例失败，就不能集成

这里主要是用github，不同的情况下用的集成CI是不一样的
接入Travis CI
1、登录travis ci  //travis-ci.org使用github登录
2、为项目开启 travis-ci.org/account/repositories
3、项目根目录下新增.travis.yml


travis.yml文件内容
install 安装项目依赖
script运行测试用例
