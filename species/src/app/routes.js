const { Router } = require('express')
const routes = Router()
const handler = require('./controller')

/**
 * Routes
 */
routes.get('/', handler.main)
routes.get('/species', handler.get)
routes.post('/species', handler.post)
routes.put('/species', handler.put)
routes.delete('/species/:id', handler.delete)

module.exports = routes
