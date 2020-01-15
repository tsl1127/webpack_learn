'use strict'

const TerserPlugin = require('terser-webpack-plugin')
const Happypack = require('happypack')
const glob = require('glob')
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')  //注意版本的原因
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')


const smp = new SpeedMeasureWebpackPlugin()
const PATHS = {
    src: path.join(__dirname, 'src')
}

const setMPA = () => {
    const entry = {

    }
    const htmlWebpackPlugins = []
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
    // console.log(entryFiles,'entryFiles')
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index]
        // console.log(entryFile,'entryFile')
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        // console.log(match,'match')
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

const { entry, htmlWebpackPlugins } = setMPA()

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production',
    // mode:'none',
    module: {
        rules: [
            {
                test: /.js$/,
                include: path.resolve('src'),  //只解析src目录里的模块
                use: [
                    // {
                    //     loader: 'thread-loader',
                    //     options: {
                    //         workers: 3
                    //     }
                    // },
                    // 'babel-loader',
                    // 'eslint-loader'
                    'happypack/loader'

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
    plugins: [
        new MiniCssExtractPlugin({   //不能与style-loader一起使用
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),

        new CleanWebpackPlugin(),
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'react',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
        //             global: 'React'
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
        //             global: 'ReactDOM'
        //         },
        //     ]
        // }),
        // new webpack.optimize.ModuleConcatenationPlugin(), //因为mode为production时会默认引入会压缩，看不到，这里把mode改为非production，手动引入来看效果
        new FriendlyErrorsWebpackPlugin(),
        function () {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
                    console.log('build error')  //这里可以做些错误日志上报
                    process.exit(1)
                }
            })
        },
        // new BundleAnalyzerPlugin(),
        new Happypack({
            loaders: [
                'babel-loader?cacheDirectory=true'
            ]
        }),
        // new webpack.DllReferencePlugin({
        //     manifest: require('./build/library/library.json')
        // })
        new HardSourceWebpackPlugin(),
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
        })
    ].concat(htmlWebpackPlugins),
    // devtool:'eval'
    // devtool: 'source-map'
    // devtool: 'inline-source-map'


    // optimization:{
    //     splitChunks: {
    //         cacheGroups:{
    //             commons:{
    //                 test:/(react|react-dom)/,
    //                 name:'vendors',  //提取公共包之后的取名
    //                 chunks:'all'
    //             }
    //         }
    //     }
    // }
    // optimization:{
    //     splitChunks: {
    //         minSize:0,  //只要有引用就打包到commons里,0代表引入的容量大小
    //         cacheGroups:{
    //             commons:{
    //                 name:'commons',
    //                 chunks:'all',
    //                 minChunks:2  //要求最少引用的次数是2次才打包
    //             }
    //         }
    //     }
    // }
    resolve: {
        alias: {
            'react': path.resolve(__dirname, './node_modules/react/umd/react.production.min.js'),
            'react-dom': path.resolve(__dirname, './node_modules/react-dom/umd/react-dom.production.min.js')
        },
        extensions: ['.js'],
        mainFields: ['main']
    }
    // stats: 'errors-only',
    // optimization: {
    //     minimizer: [
    //         new TerserPlugin({
    //             parallel: true,
    //             cache: true
    //         })
    //     ]
    // }
}