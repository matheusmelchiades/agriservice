const request = require('supertest')

const speciesMoxios = require('moxios')
const treesMoxios = require('moxios')
const grovesMoxios = require('moxios')
const harvestsMoxios = require('moxios')

const mocks = require('./mocks')
const app = require('../src/engine/launcher').instance
const speciesService = require('../src/app/services/species').api
const treesService = require('../src/app/services/trees').api
const grovesService = require('../src/app/services/groves').api
const harvestsService = require('../src/app/services/harvests').api

describe('API', () => {

    beforeEach(() => {
        speciesMoxios.install(speciesService)
        treesMoxios.install(treesService)
        grovesMoxios.install(grovesService)
        harvestsMoxios.install(harvestsService)
    })

    afterEach(() => {
        speciesMoxios.uninstall(speciesService)
        treesMoxios.uninstall(treesService)
        grovesMoxios.uninstall(grovesService)
        harvestsMoxios.uninstall(harvestsService)
    })

    it('It should return success', async done => {
        const response = await request(app).get('/')

        expect(response.status).toBe(200)
        expect(response.body).toEqual({ status: 'running' })
        done()
    })

    it('It should report error if not exists main router', async done => {
        const response = await request(app).get('/ROUTE_INVALID')

        expect(response.status).toBe(404)
        done()
    })

    it('It should get all data about species', async done => {
        const speciesMock = mocks.species()
        const mockResponseService = { count: 200, data: speciesMock }
        const pagination = { page: 1, limit: 10 }

        speciesMoxios.stubRequest('/species', {
            status: 200,
            responseText: mockResponseService
        })

        const response = await request(app)
            .get('/species')
            .query(pagination)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('count', mockResponseService.count)
        expect(response.body).toHaveProperty('data')

        response.body.data.forEach(specie => {
            expect(specie).toHaveProperty('_id')
            expect(specie).toHaveProperty('name')
            expect(specie).toHaveProperty('description')
        })

        done()
    })

    it('It should report an Error on get data about species', async done => {
        const mockResponseService = { error: 'Error message' }
        const pagination = { page: 1, limit: 10 }

        speciesMoxios.stubRequest('/species', {
            status: 400,
            responseText: mockResponseService
        })

        const response = await request(app)
            .get('/species')
            .query(pagination)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', mockResponseService.error)
        done()
    })

    it('It should get all data about trees', async done => {
        const treesMock = mocks.trees()
        const mockResponseService = { count: 87, data: treesMock }
        const pagination = { page: 1, limit: 10 }

        treesMoxios.stubRequest('/trees', {
            status: 200,
            responseText: mockResponseService
        })

        const response = await request(app)
            .get('/trees')
            .query(pagination)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('count', mockResponseService.count)
        expect(response.body).toHaveProperty('data')
        done()
    })

    it('It should report an Error on get data about trees', async done => {
        const mockResponseService = { error: 'Error message' }
        const pagination = { page: 1, limit: 10 }

        treesMoxios.stubRequest('/trees', {
            status: 400,
            responseText: mockResponseService
        })

        const response = await request(app)
            .get('/trees')
            .query(pagination)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', mockResponseService.error)
        done()
    })

    it('It should get all data about groves', async done => {
        const groves = mocks.groves()
        const mockResponseService = { count: 57, data: groves }
        const pagination = { page: 1, limit: 10 }

        grovesMoxios.stubRequest('/groves', {
            status: 200,
            responseText: mockResponseService
        })

        const response = await request(app)
            .get('/groves')
            .query(pagination)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('count', mockResponseService.count)
        expect(response.body).toHaveProperty('data')
        done()
    })

    it('It should report an Error on get data about groves', async done => {
        const mockResponseService = { error: 'Error message' }
        const pagination = { page: 1, limit: 10 }

        grovesMoxios.stubRequest('/groves', {
            status: 400,
            responseText: mockResponseService
        })

        const response = await request(app)
            .get('/groves')
            .query(pagination)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', mockResponseService.error)
        done()
    })

    it('It should get all data about harvests', async done => {
        const harvests = mocks.harvests()
        const mockResponseService = { count: 57, data: harvests }
        const pagination = { page: 1, limit: 10 }

        grovesMoxios.stubRequest('/harvests', {
            status: 200,
            responseText: mockResponseService
        })

        const response = await request(app)
            .get('/harvests')
            .query(pagination)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('count', mockResponseService.count)
        expect(response.body).toHaveProperty('data')
        done()
    })

    it('It should report an Error on get data about harvests', async done => {
        const mockResponseService = { error: 'Error message' }
        const pagination = { page: 1, limit: 10 }

        harvestsMoxios.stubRequest('/harvests', {
            status: 400,
            responseText: mockResponseService
        })

        const response = await request(app)
            .get('/harvests')
            .query(pagination)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', mockResponseService.error)
        done()
    })
})
