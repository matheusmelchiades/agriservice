const { Router } = require('express')
const routes = Router()
const handler = require('./controller')

/**
 * Routes
 */
routes.get('/', handler.main)

module.exports = routes
