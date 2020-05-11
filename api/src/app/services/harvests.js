const config = require('../../config/services').harvests
const axios = require('axios')

const api = axios.create({
    baseURL: config.host
})

module.exports.api = api

module.exports.getHarvests = (query = {}) => {

    return api({
        url: '/harvests',
        method: 'GET',
        query: {
            page: query.page,
            limit: query.limit
        }
    })
}
