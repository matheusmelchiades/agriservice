const mongoose = require('mongoose')
const model = require('./model')

module.exports.get = (_, response) => {

    try {

        return response.json({ status: 'running' })

    } catch (err) {

        return response.status(500).json({ error: 'Error internaval' })
    }
}

module.exports.post = async (request, response) => {

    try {

        const payload = request.body

        const specie = await model.create(payload)

        return response.json(specie)

    } catch (err) {

        if (err instanceof mongoose.Error) {
            return response.status(402).json({ error: 'Error to create a specie' })
        }

        return response.status(500).json({ error: err.message })
    }
}
