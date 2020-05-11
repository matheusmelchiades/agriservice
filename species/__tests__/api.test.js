const request = require('supertest')
const mockingoose = require('mockingoose').default
const mongoose = require('mongoose')
const app = require('../src/engine/launcher').instance
const model = require('../src/app/model')
const mocks = require('./mocks')

describe('API', () => {

    beforeEach(() => {
        mockingoose.resetAll()
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

    it('It should create a specie with success', async done => {
        const specie = mocks.specie()

        mockingoose(model).toReturn(specie, 'create')

        const response = await request(app)
            .post('/species')
            .send(specie)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('_id')
        expect(response.body).toHaveProperty('name', specie.name)
        expect(response.body).toHaveProperty('description', specie.description)
        done()
    })

    it('It should report on create a specie with error', async done => {
        const specie = mocks.specie()

        mockingoose(model).toReturn(new mongoose.Error(), 'save')

        const response = await request(app)
            .post('/species')
            .send(specie)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', 'Error to create a specie')
        done()
    })

    it('It should return all data about species', async done => {
        const species = mocks.species()
        const pagination = {
            limit: 10,
            page: 1
        }

        const skipper = (pagination.page - 1) * pagination.limit
        const mockResponse = species.slice(skipper >= 0 ? skipper : 0, pagination.limit)

        mockingoose(model).toReturn(mockResponse, 'find')
        mockingoose(model).toReturn(species.length, 'count')

        const response = await request(app)
            .get('/species')
            .query(pagination)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('count', species.length)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.length).toBe(mockResponse.length)
        done()
    })

    it('It should report error on get all data about species', async done => {
        const pagination = {
            limit: 10,
            page: 1
        }

        mockingoose(model).toReturn(new mongoose.Error(), 'find')

        const response = await request(app)
            .get('/species')
            .query(pagination)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', 'Error to get species')
        done()
    })

    it('It should update a specie with success', async done => {
        const specie = mocks.specie()
        const specieUpdate = { ...specie, name: 'Gorse' }

        mockingoose(model).toReturn(specieUpdate, 'findOneAndUpdate')

        const response = await request(app)
            .put('/species')
            .send(specieUpdate)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('_id', specieUpdate._id)
        expect(response.body).toHaveProperty('name', specieUpdate.name)
        expect(response.body).toHaveProperty('description', specieUpdate.description)
        done()
    })

    it('It should report an Error on update a invalid payload', async done => {
        const specie = mocks.specie()
        const specieUpdate = { ...specie, name: 'Gorse' }

        mockingoose(model).toReturn(new mongoose.Error(), 'findOneAndUpdate')

        const response = await request(app)
            .put('/species')
            .send(specieUpdate)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', 'Error to update species')
        done()
    })

    it('It should delete a specie with success', async done => {
        const specie = mocks.specie()

        mockingoose(model).toReturn({}, 'findOneAndDelete')

        const response = await request(app)
            .delete(`/species/${specie._id}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('message', 'Deleted with success')
        done()
    })

    it('It should report if not found a spect to delete', async done => {
        const idFake = mongoose.Types.ObjectId()

        mockingoose(model).toReturn(null, 'findOneAndDelete')

        const response = await request(app)
            .delete(`/species/${idFake}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', 'Not found specie')
        done()
    })

    it('It should report error to delete a specie', async done => {
        const specie = mocks.specie()

        mockingoose(model).toReturn(new mongoose.Error(), 'findOneAndDelete')

        const response = await request(app)
            .delete(`/species/${specie._id}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', 'Error to delete a specie')
        done()
    })
})
