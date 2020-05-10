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

    it('It should create a grove with success', async done => {
        const grove = mocks.grove()
        const groveDb = { ...grove, trees: [] }
        const grovePayload = {
            name: grove.name,
            description: grove.description
        }

        mockingoose(model).toReturn(groveDb, 'create')

        const response = await request(app)
            .post('/groves')
            .send(grovePayload)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('_id')
        expect(response.body).toHaveProperty('name', grove.name)
        expect(response.body).toHaveProperty('description', grove.description)
        expect(response.body).toHaveProperty('trees')
        expect(response.body.trees).toBeInstanceOf(Array)
        expect(response.body.trees.length).toBe(0)
        done()
    })

    it('It should report on create a grove with error', async done => {
        const grove = mocks.grove()

        mockingoose(model).toReturn(new mongoose.Error(), 'save')

        const response = await request(app)
            .post('/groves')
            .send(grove)

        expect(response.status).toBe(402)
        expect(response.body).toHaveProperty('error', 'Error to create a grove')
        done()
    })

    it('It should return all data about groves', async done => {
        const groves = mocks.groves()
        const pagination = {
            limit: 10,
            page: 1
        }

        const skipper = (pagination.page - 1) * pagination.limit
        const mockResponse = groves.slice(skipper >= 0 ? skipper : 0, pagination.limit)

        mockingoose(model).toReturn(mockResponse, 'find')
        mockingoose(model).toReturn(groves.length, 'count')

        const response = await request(app)
            .get('/groves')
            .query(pagination)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('count', groves.length)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.length).toBe(mockResponse.length)
        done()
    })

    it('It should report error on get all data about groves', async done => {
        const pagination = {
            limit: 10,
            page: 1
        }

        mockingoose(model).toReturn(new mongoose.Error(), 'find')

        const response = await request(app)
            .get('/groves')
            .query(pagination)

        expect(response.status).toBe(402)
        expect(response.body).toHaveProperty('error', 'Error to get groves')
        done()
    })

    it('It should update a grove with success', async done => {
        const grove = mocks.grove()
        const groveUpdate = { ...grove, name: 'Gorse' }

        mockingoose(model).toReturn(groveUpdate, 'findOneAndUpdate')

        const response = await request(app)
            .put('/groves')
            .send(groveUpdate)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('_id', groveUpdate._id)
        expect(response.body).toHaveProperty('name', groveUpdate.name)
        expect(response.body).toHaveProperty('description', groveUpdate.description)
        done()
    })

    it('It should report an Error on update a grove with invalid payload', async done => {
        const grove = mocks.grove()
        const groveUpdate = { ...grove, name: 'Gorse' }

        mockingoose(model).toReturn(new mongoose.Error(), 'findOneAndUpdate')

        const response = await request(app)
            .put('/groves')
            .send(groveUpdate)

        expect(response.status).toBe(402)
        expect(response.body).toHaveProperty('error', 'Error to update groves')
        done()
    })
})
