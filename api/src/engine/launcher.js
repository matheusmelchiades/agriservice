const express = require('express')
const morgan = require('morgan')
const config = require('../config/server')
const routes = require('../app/routes')

const app = express()

/**
 * MIDDLEWARES
 */
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(routes)

function run() {
    app.listen(config.port, config.host, () => {
        console.log(`server running on http://${config.host}:${config.port}`)
    })
}

module.exports = { instance: app, run }
