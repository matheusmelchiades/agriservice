const config = require('../../config/services').groves
const axios = require('axios')

const api = axios.create({
    baseURL: config.host
})

module.exports.api = api

module.exports.getGroves = (query = {}) => {

    return api({
        url: '/groves',
        method: 'GET',
        query: {
            page: query.page,
            limit: query.limit
        }
    })
}
