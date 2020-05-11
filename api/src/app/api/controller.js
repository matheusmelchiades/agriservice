const speciesService = require('../services/species')
const treesService = require('../services/trees')
const grovesService = require('../services/groves')
const harvestsService = require('../services/harvests')

module.exports.main = (_, response) => {

    try {

        return response.json({ status: 'running' })

    } catch (err) {

        return response.status(500).json({ error: 'Error internaval' })
    }
}

module.exports.getSpecies = async (request, response) => {

    try {
        const { query } = request

        const specieResponse = await speciesService.getSpecies(query)

        return response.json(specieResponse.data || {})

    } catch (err) {

        if (err.response.data.error) {

            return response.status(err.response.status).json(err.response.data)
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}

module.exports.getTrees = async (request, response) => {

    try {
        const { query } = request

        const treeResponse = await treesService.getTrees(query)

        return response.json(treeResponse.data)

    } catch (err) {

        if (err.response.data.error) {

            return response.status(err.response.status).json(err.response.data)
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}

module.exports.getGroves = async (request, response) => {

    try {
        const { query } = request

        const grovesResponse = await grovesService.getGroves(query)

        return response.json(grovesResponse.data)

    } catch (err) {

        if (err.response.data.error) {

            return response.status(err.response.status).json(err.response.data)
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}

module.exports.getHarvests = async (request, response) => {

    try {
        const { query } = request

        const harvestsResponse = await harvestsService.getHarvests(query)

        return response.json(harvestsResponse.data)

    } catch (err) {

        if (err.response.data.error) {

            return response.status(err.response.status).json(err.response.data)
        }

        return response.status(500).json({ error: 'Error internaval' })
    }
}
