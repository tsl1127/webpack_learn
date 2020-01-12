
const assert = require('assert')

describe('webpack.base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base')
    // console.log(baseConfig)
    it('entry', () => {
        assert.equal(baseConfig.entry.index, 'D:/webpack_learn/builder-webpack/test/smock/template/src/index/index.js')
        assert.equal(baseConfig.entry.search, 'D:/webpack_learn/builder-webpack/test/smock/template/src/search/index.js')
    })
})