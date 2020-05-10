const { Router } = require('express')
const routes = Router()
const handler = require('./controller')

/**
 * Routes
 */
routes.get('/', handler.main)
routes.post('/groves', handler.post)
routes.get('/groves', handler.get)

module.exports = routes
