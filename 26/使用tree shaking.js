tree shaking
概念：一个模块可能有多种方法，只要其中的某个方法使用到了，则整个文件都会被打到bundle里面去，tree-shaking就是只把用到的方法打入bundle，没用到的方法会在uglify阶段被擦除掉

使用：webpack默认支持，在.babelrc里设置modules: false即可
mode为production下默认开启

要求必须支持es6的语法，CJS的方式不支持


无用的CSS如何删除掉
PurifyCSS: 遍历代码，识别已经用到的CSS class

uncss：HTML需要通过jsdom加载，所有的样式通过PostCSS解析，通过document.querySelector来识别在html文件里面不存在的选择器

一：在webpack中如何使用PurifyCSS

使用purgecss-webpack-plugin和mini-css-extract-plugin配合使用

