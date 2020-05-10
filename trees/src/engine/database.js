
const mongoose = require('mongoose')
const config = require('../config/database')

function createUrl() {

    const { host, port, database } = config

    if (config.connection.uri) {
        return config.connection.uri
    }

    return `mongodb://${host}${port ? `:${port}` : ''}/${database}`
}

module.exports.connect = cb => {

    const url = createUrl()

    mongoose.connect(url, config.options, (err, connection) => {
        if (err) {
            console.log('Erro to connect database')
            process.exit(1)
        }

        console.log(`Database ${connection.name} connected`)

        return cb(null, connection)
    })
}
