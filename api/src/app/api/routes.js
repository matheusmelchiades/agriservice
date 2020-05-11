const { Router } = require('express')
const routes = Router()
const handler = require('./controller')

/**
 * Routes
 */
routes.get('/', handler.main)

// SPECIES SERVICES
routes.get('/species', handler.getSpecies)

// TREES SERVICES
routes.get('/trees', handler.getTrees)

// GROVES SERVICES
routes.get('/groves', handler.getGroves)

// HARVESTS SERVICES
routes.get('/harvests', handler.getHarvests)

module.exports = routes
