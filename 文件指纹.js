文件指纹：
打包后输出的文件名的后缀
index_51727db.js
做版本管理的作用


文件指纹如何生成
    hash：和整个项目的构建有关，只要项目文件有修改，整个项目构建的hash值就会更改
    chunkhash：和webpack打包的chunk有关，不同的entry会生成不同的chunkhash值
    contenthash：根据文件内容来定义hash，文件内容不变，则contenthash不变


    举例
    js的文件指纹设置
    设置output的filename使用chunkhash
    filename: '[name][chunkhash:8].js'

    css的文件指纹设置（首先把输出的css单独提取出来）
    设置MiniCssExtractPlugin 的filename，使用contenthash
    //这个插件没法和style-loader一个使用   style-loader是把样式插入到head里，

    plugins:[
        new MiniCssExtractPlugin({
            filename:'[name][contenthash:8].css'
        })
    ]

    图片的文件指纹设置
    设置file-loader的name，使用[hash]

    use:[
        {
            loader:'file-loader',
            options:{
                name:'img/[name][hash:8].[ext]'
            }
        }
    ]

    占位符和含义
    [ext]   资源后缀名
    [name]  文件名称
    [path]  文件相对路径
    [folder]  文件所在的文件夹
    [contenthash]  文件的内容hash，默认是md5生成
    [hash]  文件的内容hash，默认是md5生成
    [emoji]  一个随机的指代文件内容的emoji
