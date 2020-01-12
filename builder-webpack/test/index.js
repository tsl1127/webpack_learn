const path = require('path');
// console.log('dirname',__dirname)
process.chdir(path.join(__dirname, 'smock/template'));

describe('builder-webpack test case', () => {
    require('./unit/webpack-base-test')
})