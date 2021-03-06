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

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', 'Error to create a tree')
        done()
    })

    it('It should return all data about tree', async done => {
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

    it('It should report error on get all data about tree', async done => {
        const pagination = {
            limit: 10,
            page: 1
        }

        mockingoose(model).toReturn(new mongoose.Error(), 'find')

        const response = await request(app)
            .get('/trees')
            .query(pagination)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', 'Error to get trees')
        done()
    })

    it('It should update a tree with success', async done => {
        const tree = mocks.tree()
        const treeUpdate = { ...tree, name: 'TESTE' }

        mockingoose(model).toReturn(treeUpdate, 'findOneAndUpdate')

        const response = await request(app)
            .put('/trees')
            .send(treeUpdate)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('_id', treeUpdate._id)
        expect(response.body).toHaveProperty('name', treeUpdate.name)
        expect(response.body).toHaveProperty('description', treeUpdate.description)
        done()
    })

    it('It should report an Error on update a invalid payload', async done => {
        const tree = mocks.tree()
        const treeUpdate = { ...tree, name: 'TESTE' }

        mockingoose(model).toReturn(new mongoose.Error(), 'findOneAndUpdate')

        const response = await request(app)
            .put('/trees')
            .send(treeUpdate)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', 'Error to update tree')
        done()
    })

    it('It should delete a tree with success', async done => {
        const tree = mocks.tree()

        mockingoose(model).toReturn({}, 'findOneAndDelete')

        const response = await request(app)
            .delete(`/trees/${tree._id}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message', 'Deleted with success')
        done()
    })

    it('It should report if not found a tree to delete', async done => {
        const idFake = mongoose.Types.ObjectId()

        mockingoose(model).toReturn(null, 'findOneAndDelete')

        const response = await request(app)
            .delete(`/trees/${idFake}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', 'Not found tree')
        done()
    })

    it('It should report error to delete a tree', async done => {
        const tree = mocks.tree()

        mockingoose(model).toReturn(new mongoose.Error(), 'findOneAndDelete')

        const response = await request(app)
            .delete(`/trees/${tree._id}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', 'Error to delete a tree')
        done()
    })
})
