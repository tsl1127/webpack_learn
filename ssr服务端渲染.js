客户端渲染
网页打开过程
开始加载  HTML加载成功，开始加载数据 
数据加载成功，渲染成功开始加载图片资源
图片加载成功，页面可交互


服务端渲染是什么
渲染：HTML+CSS+JS+Data  ->渲染后的HTML


服务端：
    所有模板等资源都存储在服务器
    内网机器拉取数据更快
    一个HTML返回所有数据

浏览器和服务器交互流程
                 HTML模板
请求开始->server->        ->server render-> 浏览器解析并渲染->加载并执行js和其他资源->页面完全可交互
                 data

客户端渲染和服务端渲染的区别
请求：客户端多个请求（HTML，数据）   服务端1个请求

加载过程：客户端HTML&数据串行加载    服务端1个请求返回HTML&数据

渲染：客户端：前端渲染  服务端渲染

可交互：都是图片等静态资源加载完成，JS逻辑执行完成可交互

SSR 核心是减少请求

SSR的优势：减少白屏时间  对于SEO友好

SSR代码实现思路
服务端：使用react-dom/server 的renderToString方法将React组件渲染成字符串
服务端路由返回对应的模板

客户端：打包出针对服务端的组件


webpack ssr打包存在的问题
浏览器的全局变量（node.js中没有document window）
    组件适配：将不兼容的组件根据打包环境进行适配
    请求适配：将fetch或ajax发送请求的写法改成isomorphic-fetch或者axios

样式问题：(node.js无法解析css)
    方案一：服务端打包通过ignore-loader忽略掉css的解析
    方案二：将style-loader替换成isomorphic-style-loader//(css in js的写法)



