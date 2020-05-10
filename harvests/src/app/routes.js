const { Router } = require('express')
const routes = Router()
const handler = require('./controller')

/**
 * Routes
 */
routes.get('/', handler.main)
routes.get('/harvests', handler.get)
routes.post('/harvests', handler.post)

module.exports = routes
