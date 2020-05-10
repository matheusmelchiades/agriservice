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
})
