
const glob = require('glob')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')  //注意版本的原因
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const setMPA = () => {
    const entry = {

    }
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1]
        entry[pageName] = entryFile
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({  //一个页面对应一个
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}.html`,  //打包出来的文件名称
                chunks: ['vendors', pageName],  //指定生成的html使用哪个chunk
                inject: true,  //打包出来的css、js会自动的注入到html里面
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    nimifyJS: true,
                    removeComments: false
                }
            }),
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA()  //多页面打包


module.exports = {
    entry: entry,
    module: {
        rules: [
            {
                test: /.js$/,
                use: [
                    'babel-loader',
                    // 'eslint-loader'
                ]
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    // 'style-loader',
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 2 version', '>1%', 'ios 7']  //兼容的浏览器版本
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75, //rem相对px转换的单位，这里表示1个rem代表75px
                            remPrecision: 8 //px转换为rem时的小数点的位数
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|svg|gif)$/,
                // use: "file-loader"
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // limit:10240   
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                // use: "file-loader"
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // limit:10240   
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({   //不能与style-loader一起使用，单独提取出一个css文件出来
            filename: '[name]_[contenthash:8].css'
        }),
        new CleanWebpackPlugin(),  //目录清理
        new FriendlyErrorsWebpackPlugin(), //错误日志优化
        function () {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
                    console.log('build error')  //这里可以做些错误日志上报
                    process.exit(1)
                }
            })
        }
    ].concat(htmlWebpackPlugins),
    stats: 'errors-only'
}