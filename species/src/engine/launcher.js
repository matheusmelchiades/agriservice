const express = require('express')
const morgan = require('morgan')
const config = require('../config/server')
const routes = require('../app/routes')
const database = require('./database')

const app = express()

/**
 * MIDDLEWARES
 */
app.use(express.json())
app.use(morgan('dev'))
app.use(routes)

function run() {

    database.connect(() => {

        app.listen(config.port, config.host, () => {
            console.log(`server running on http://${config.host}:${config.port}`)
        })
    })
}

module.exports = { instance: app, run }
