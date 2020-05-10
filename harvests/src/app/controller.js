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

        const harvest = await model.create(payload)

        return response.json(harvest)

    } catch (err) {

        if (err instanceof mongoose.Error) {
            return response.status(402).json({ error: 'Error to create a harvest' })
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}

module.exports.get = async (request, response) => {

    try {

        const { page = 1, limit = 10 } = request.query

        const skipper = (page - 1) * limit
        const count = await model.count()
        const harvests = await model.find()
            .skip(skipper >= 0 ? skipper : 0)
            .limit(limit)

        return response.json({ count, data: harvests || [] })

    } catch (err) {

        if (err instanceof mongoose.Error) {
            return response.status(402).json({ error: 'Error to get harvests' })
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}

module.exports.put = async (request, response) => {

    try {
        const id = request.params
        const payload = request.body

        const harvest = await model.findByIdAndUpdate({ _id: id }, payload)

        if (!harvest) return response.status(402).json({ error: 'Harvest not found!' })

        return response.json({ message: 'Harvest updated with success!' })

    } catch (err) {

        if (err instanceof mongoose.Error) {
            return response.status(402).json({ error: 'Error to update harvests' })
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}
