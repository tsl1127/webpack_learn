图片压缩
要求：基于Node库的imagemin或tinypng API 


使用：配置image-webpack-loader 

imagemin的优点分析

有很多定制选项
可以引入更多第三方优化插件，例如pngquant
可以处理多种图片格式

imagemin的压缩原理
pngquant pngcrush optipng tinypng

image-webpack-loader 依赖了 pngquant，而新版本的 pngquant 已经不再支持 Windows 了