const { Router } = require('express')
const routes = Router()
const handler = require('./controller')

/**
 * Routes
 */
routes.get('/', handler.main)
routes.get('/trees', handler.get)
routes.post('/trees', handler.post)

module.exports = routes
