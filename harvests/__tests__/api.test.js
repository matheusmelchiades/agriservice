const request = require('supertest')
const mockingoose = require('mockingoose').default
const mongoose = require('mongoose')
const app = require('../src/engine/launcher').instance
const model = require('../src/app/model')
const mocks = require('./mocks')

describe('API', () => {

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

    it('It should create a harvest with success', async done => {
        const harvest = mocks.harvest()
        const harvestDb = {
            ...harvest,
            trees: []
        }

        delete harvest.trees

        mockingoose(model).toReturn(harvestDb, 'create')

        const response = await request(app)
            .post('/harvests')
            .send(harvest)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('_id')
        expect(response.body).toHaveProperty('name', harvestDb.name)
        expect(response.body).toHaveProperty('description', harvestDb.description)
        expect(response.body).toHaveProperty('trees')
        expect(response.body.trees).toBeInstanceOf(Array)
        expect(response.body.trees.length).toBe(0)
        done()
    })

    it('It should report on create a harvest with error', async done => {
        const harvest = mocks.harvest()

        mockingoose(model).toReturn(new mongoose.Error(), 'save')

        const response = await request(app)
            .post('/harvests')
            .send(harvest)

        expect(response.status).toBe(402)
        expect(response.body).toHaveProperty('error', 'Error to create a harvest')
        done()
    })

    it('It should return all data about harvest', async done => {
        const harvests = mocks.harvests()
        const pagination = {
            limit: 10,
            page: 1
        }

        const skipper = (pagination.page - 1) * pagination.limit
        const mockResponse = harvests.slice(skipper >= 0 ? skipper : 0, pagination.limit)

        mockingoose(model).toReturn(mockResponse, 'find')
        mockingoose(model).toReturn(harvests.length, 'count')

        const response = await request(app)
            .get('/harvests')
            .query(pagination)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('count', harvests.length)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.length).toBe(mockResponse.length)

        response.body.data.forEach(harvest => {
            expect(harvest).toHaveProperty('_id')
            expect(harvest).toHaveProperty('about')
            expect(harvest).toHaveProperty('date')
            expect(harvest).toHaveProperty('grossWeight')
            expect(harvest).toHaveProperty('trees')
            harvest.trees.forEach(tree => {
                expect(mongoose.Types.ObjectId.isValid(tree)).toBe(true)
            })
        })
        done()
    })

    it('It should report error on get all data about harvests', async done => {
        const pagination = {
            limit: 10,
            page: 1
        }

        mockingoose(model).toReturn(new mongoose.Error(), 'find')

        const response = await request(app)
            .get('/harvests')
            .query(pagination)

        expect(response.status).toBe(402)
        expect(response.body).toHaveProperty('error', 'Error to get harvests')
        done()
    })
})
