传统方式
用媒体查询实现响应式布局
缺陷：需要写多套适配样式代码


移动端css px自动转换为rem
使用px2rem-loader

页面渲染时计算根元素的font-size值
可以使用手淘的lib-flexible库
github.com/amfe/lib-flexible

npm i px2rem-loader -D

npm i lib-flexible -S

在node_modules中找到lib-flexible，找到flexible.js，然后代码复制进去
因为需要一开始就运行，所以把代码前置，放到head标签里


编译完成之后，在dist里打开html，在浏览器中，当变化尺寸时，font-size会自动计算