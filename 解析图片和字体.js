解析图片
file-loader处理文件

const path = require('path')
module.exports = {
    entry: './src/index.js',
    output: {
        filename:'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.(png|svg|jpg|gif)$/,
                use: "file-loader"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: "file-loader"
            }
        ]
    }
}

构建完成之后的图片前缀是一长串数字：是图片的hash


解析字体
file-loader也是可以处理字体

先引入一个字体
然后在css中写：

@font-face {
    font-family: 'xxx';  //字体名
    src: URL('./images/xxx.woff') format('truetype');
}

然后引入这个字体
.css {
    font-family: 'xxx';
}


使用url-loader也是可以解析字体和图片
可以设置较小资源自动base64


rules: [
    {
        test: /\.(png|jpg|svg|gif)$/,
        use:[
            {
                loader: 'url-loader',
                options:{
                    limit: 10240
                }
            }
        ]
    }
]