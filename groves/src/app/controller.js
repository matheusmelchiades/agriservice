const mongoose = require('mongoose')
const model = require('./model')

module.exports.main = (_, response) => {

    try {

        return response.json({ status: 'running' })

    } catch (err) {

        return response.status(500).json({ error: 'Error internaval' })
    }
}

module.exports.post = async (request, response) => {

    try {

        const payload = request.body

        const grove = await model.create(payload)

        return response.json(grove)

    } catch (err) {

        if (err instanceof mongoose.Error) {
            return response.status(402).json({ error: 'Error to create a grove' })
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}

module.exports.get = async (request, response) => {

    try {

        const { page = 1, limit = 10 } = request.query

        const skipper = (page - 1) * limit
        const count = await model.count()
        const groves = await model.find()
            .skip(skipper >= 0 ? skipper : 0)
            .limit(limit)

        return response.json({ count, data: groves || [] })

    } catch (err) {

        if (err instanceof mongoose.Error) {
            return response.status(402).json({ error: 'Error to get groves' })
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}

module.exports.put = async (request, response) => {

    try {

        const payload = request.body

        const grove = await model.findByIdAndUpdate({ _id: payload._id }, factoryToUpdate(payload))

        return response.json(grove)

    } catch (err) {

        if (err instanceof mongoose.Error) {
            return response.status(402).json({ error: 'Error to update groves' })
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}

function factoryToUpdate(payload) {

    return JSON.parse(JSON.stringify({
        name: payload.name,
        description: payload.description
    }))
}
