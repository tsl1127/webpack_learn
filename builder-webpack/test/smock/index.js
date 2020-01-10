const path = require('path');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha')
const mocha = new Mocha({
    timeout: '10000ms' //10秒
})

process.chdir(path.join(__dirname, 'template'))  //进入template目录

rimraf('./dist', () => {  //rimraf这个库表示每次删除dist目录，成功后进入回调函数
    const prodConfig = require('../../lib/webpack.prod.js')
    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.error(err)
            process.exit(2)
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }))
        console.log('webpack build success 开始执行测试用例')
        mocha.addFile(path.join(__dirname,'html-test.js'))
        mocha.addFile(path.join(__dirname,'css-js-test.js'))
        mocha.run()
    })
})