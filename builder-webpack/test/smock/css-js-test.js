const glob = require('glob-all')


describe('检查生成css js文件', () => {
    it('应该产生css js文件', (done) => {
        const files = glob.sync([
            './dist/index_*.js',
            // './dist/index_*.css',
            './dist/search_*.js',
            './dist/search_*.css',
        ])
        if (files.length > 0) {
            done()
        } else {
            throw new Error('no css js files 产生')
        }
    })
})