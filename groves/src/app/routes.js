const { Router } = require('express')
const routes = Router()
const handler = require('./controller')

/**
 * Routes
 */
routes.get('/', handler.main)
routes.post('/groves', handler.post)
routes.get('/groves', handler.get)
routes.put('/groves', handler.put)
routes.delete('/groves/:id', handler.delete)

module.exports = routes
