webpack本身只支持js json文件类型
通过loaders去支持其他文件类型

常见loaders
babel-loader  转换es6、es7等js新语法
css-loader 支持.css文件的加载和解析
less-loader 将less文件转换为css
ts-loader 将ts转换为js
file-loader 进行图片、字体的打包
raw-loader 将文字以字符串的形式导入
thread-loader 多进程打包js和css


loaders的用法

const path = require('path')
module.exports = {
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules:[
            {
                test: /\.txt$/, use:'raw-loader'   //test指定匹配规则，use指定使用的loader名称
            }
        ]
    }
}
