entry是webpack的打包入口

单入口:entry是个字符串
module.exports = {
    entry:'./path/to/file.js'
}

多入口：entry是个对象
module.exports = {
    entry: {
        app: './src/app.js',
        adminApp: './src/adminApp.js'
    }
}