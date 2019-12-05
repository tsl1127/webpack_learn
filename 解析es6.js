使用babel-loader

babel的配置文件.babelrc

const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    }
}


.babelrc配置
{
    "presets":[
        "@babel/preset-env"                  ——增加es6的babel preset配置
    ],
    "plugins":[
        "@babel/proposal-class-properties"
    ]
}