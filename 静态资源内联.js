内联：js、css代码自动放入到html里面去

内联的意义
代码层面：
    页面框架的初始化脚本
    上报相关打点
    css内联避免页面闪动

请求层面：减少http网络请求数
    小图片或字体内联（url-loader）


    html和Js内联
    
    raw-loader内联html

    raw-loader内联js


    css内联
    方案一：借助css-loader

        use:[
            {
                loader: 'style-loader',
                options:{
                    insertAt: 'top',  //样式插入到<head>
                    singleton: true  //将所有的style标签合并为一个
                }
            }
        ]

    方案二：html-inline-css-webpack-plugin

