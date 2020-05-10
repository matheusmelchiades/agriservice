require('dotenv').config({
    path: process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : '.env'
})

module.exports = {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5001
}
