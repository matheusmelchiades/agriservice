const config = require('../../config/services').trees
const axios = require('axios')

const api = axios.create({
    baseURL: config.host
})

module.exports.api = api

module.exports.getTrees = (query = {}) => {

    return api({
        url: '/trees',
        method: 'GET',
        query: {
            page: query.page,
            limit: query.limit
        }
    })
}
