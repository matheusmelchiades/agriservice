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

        const specie = await model.create(payload)

        return response.json(specie)

    } catch (err) {

        if (err instanceof mongoose.Error) {
            return response.status(400).json({ error: 'Error to create a specie' })
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}

module.exports.get = async (request, response) => {

    try {

        const { page = 1, limit = 10 } = request.query

        const skipper = Number((page - 1) * limit)
        const count = await model.count()
        const species = await model.find()
            .skip(skipper >= 0 ? skipper : 0)
            .limit(Number(limit))

        return response.json({ count, data: species || [] })

    } catch (err) {
        console.log(err)
        if (err instanceof mongoose.Error) {
            return response.status(400).json({ error: 'Error to get species' })
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}

module.exports.put = async (request, response) => {

    try {

        const payload = request.body

        const specie = await model.findByIdAndUpdate({ _id: payload._id }, payload)

        return response.json(specie)

    } catch (err) {

        if (err instanceof mongoose.Error) {
            return response.status(400).json({ error: 'Error to update species' })
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}

module.exports.delete = async (request, response) => {

    try {

        const { id } = request.params

        const deleted = await model.findOneAndDelete({ _id: id })

        if (!deleted) throw new mongoose.Error('Not found specie')

        return response.json({ message: 'Deleted with success' })

    } catch (err) {

        if (err instanceof mongoose.Error) {
            const responseError = {
                error: err.message || 'Error to delete a specie'
            }

            return response.status(400).json(responseError)
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}
