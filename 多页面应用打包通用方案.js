MPA
每一次页面跳转的时候，后台服务器都会给返回一个新的html文档
这种类型的网站也就是多页网站，也叫做多页应用

相互之间是解耦的
对SEO更加友好

基本思路
每个页面对应一个entry，一个html-webpack-plugin
缺点：每次新增或删除页面需要更改webpack配置


通用方案
动态获取entry和设置html-webpack-plugin数量
利用glob.sync
