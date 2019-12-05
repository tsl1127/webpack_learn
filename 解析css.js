css-loader用于解析.css文件，并转换为commonjs对象
style-loader将样式通过<style>标签插入到head中

const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    'style-loader',    //注意loader解析是链式调用，有顺序的，从右向左
                    'css-loader'
                ]
            }

        ]
    }
}

//安装css-loader style-loader
