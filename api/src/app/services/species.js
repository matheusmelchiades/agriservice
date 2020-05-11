const axios = require('axios')
const config = require('../../config/services').species

const api = axios.create({
    baseURL: config.host
})

module.exports.api = api

module.exports.getSpecies = (query = {}) => {

    return api({
        url: '/species',
        method: 'GET',
        query: {
            page: query.page,
            limit: query.limit
        }
    })
}
