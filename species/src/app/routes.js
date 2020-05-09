const { Router } = require('express')
const routes = Router()
const handler = require('./controller')

/**
 * Routes
 */
routes.get('/', handler.main)
routes.get('/species', handler.get)
routes.post('/species', handler.post)

module.exports = routes
