if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/large-number')
} else {
    module.exports = require('./dist/large-number.min')
}