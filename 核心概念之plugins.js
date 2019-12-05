插件用于bundle文件的优化，资源管理和环境变量注入，作用于整个构建过程

增强webpack的功能


常见plugins

CommonsChunkPlugin   将chunks相同的模块代码提取成公共js
CleanWebpackPlugin  清理构建目录
ExtractTextWebpackPlugin 将css从bundle文件里提取成一个独立的css文件
CopyWebpackPlugin  将文件或文件夹拷贝到构建的输出目录
HtmlWebpackPlugin 创建html文件去承载输出的bundle文件
UglifyjsWebpackPlugin 压缩js
ZipWebpackPlugin 将打包出的资源生成一个zip包



Plugins的用法
const path = require('path')
module.exports = {
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({                        //放到plugins数组里
            template: './src/index.html'
        })
    ]
}