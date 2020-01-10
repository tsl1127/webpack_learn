const glob = require('glob-all')


describe('检查生成html文件', () => {
    it('应该产生html文件', (done) => {
        const files = glob.sync([
            './dist/index.html',
            './dist/search.html'
        ])
        if (files.length > 0) {
            done()
        } else {
            throw new Error('no html files 产生')
        }
    })
})