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

    it('It should create a tree with success', async done => {
        const tree = mocks.tree()

        delete tree._id

        const response = await request(app)
            .post('/trees')
            .send(tree)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('_id')
        expect(response.body).toHaveProperty('name', tree.name)
        expect(response.body).toHaveProperty('description', tree.description)
        expect(response.body).toHaveProperty('born', tree.born)
        expect(response.body).toHaveProperty('specie', tree.specie)
        done()
    })

    it('It should report error create a tree', async done => {
        const tree = mocks.tree()

        delete tree._id

        mockingoose(model).toReturn(new mongoose.Error(), 'save')

        const response = await request(app)
            .post('/trees')
            .send(tree)

        expect(response.status).toBe(402)
        expect(response.body).toHaveProperty('error', 'Error to create a tree')
        done()
    })

    it('It should return all data about species', async done => {
        const trees = mocks.trees()
        const pagination = {
            limit: 10,
            page: 1
        }

        const skipper = (pagination.page - 1) * pagination.limit
        const mockResponse = trees.slice(skipper >= 0 ? skipper : 0, pagination.limit)

        mockingoose(model).toReturn(mockResponse, 'find')
        mockingoose(model).toReturn(trees.length, 'count')

        const response = await request(app)
            .get('/trees')
            .query(pagination)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('count', trees.length)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.length).toBe(mockResponse.length)

        response.body.data.forEach(tree => {
            expect(tree).toHaveProperty('_id')
            expect(tree).toHaveProperty('name', tree.name)
            expect(tree).toHaveProperty('description', tree.description)
            expect(tree).toHaveProperty('born', tree.born)
            expect(tree).toHaveProperty('specie', tree.specie)
        })

        done()
    })

    it('It should report error on get all data about species', async done => {
        const pagination = {
            limit: 10,
            page: 1
        }

        mockingoose(model).toReturn(new mongoose.Error(), 'find')

        const response = await request(app)
            .get('/trees')
            .query(pagination)

        expect(response.status).toBe(402)
        expect(response.body).toHaveProperty('error', 'Error to get trees')
        done()
    })
})
