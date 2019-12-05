编译后的输出

单入口配置
module.exports = {
    entry:'./path/to/my/entry/file.js',
    output: {
        filename: 'bundle.js',
        path: __dirname+'./dist'
    }
}

output多入口
module.exports = {
    entry: {
        app: './src/app.js',
        adminApp: './src/adminApp.js'
    },
    output: {
        filename:'[name].js',     //通过占位符确保文件名称的唯一
        path: __dirname+'./dist'
    }
}

