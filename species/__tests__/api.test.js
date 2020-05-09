const request = require('supertest')
const mockingoose = require('mockingoose').default
const mongoose = require('mongoose')
const app = require('../src/engine/launcher').instance
const model = require('../src/app/model')

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

    it('It should create a specie with success', async done => {
        const specie = {
            name: 'Abies alba',
            description: 'The  leaves are rigid, needle-like and short, only 1.2-3 cm long.'
        }

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
        const specie = {
            name: 'Abies alba',
            description: 'The  leaves are rigid, needle-like and short, only 1.2-3 cm long.'
        }

        mockingoose(model).toReturn(new mongoose.Error(), 'save')

        const response = await request(app)
            .post('/species')
            .send(specie)

        expect(response.status).toBe(402)
        expect(response.body).toHaveProperty('error', 'Error to create a specie')
        done()
    })
})
