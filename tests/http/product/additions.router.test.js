const request = require('supertest');
const { app } = require('../../../app')

// const { } = require('../../../modules/products/additions')
jest.mock('../../../modules/products/additions', () => {
    return {
        insertAddition: jest.fn((obj) => {
            if (obj.name == "error")
                throw new Error('wow')
            else
                return true
        }),
        findAddition: jest.fn((obj) => {
            if (obj == "error")
                throw new Error('wow')
            else
                return true
        })
    }
})

describe('/additions/create', () => {

    it('shuold insert a new addition', async () => {
        const res = await request(app).post('/additions/create').send({ name: "success" })
        expect(res.statusCode).toBe(201)
        expect(res).toBeDefined()
        expect(res.headers['content-type'])
            .toBe("application/json; charset=utf-8")
    })

    it('should check the mock', async () => {
        const { insertAddition } = jest.requireMock('../../../modules/products/additions')
        _ = await request(app).post('/additions/create').send({ name: "success" })
        expect(insertAddition).toHaveBeenCalled();
    })

    it('should fali inserting', async () => {
        const response = await request(app).post('/additions/create').send({ name: "error" })
        expect(response.statusCode).toBe(500)
    })
})

describe('/additions/find', () => {

    it('shuold find additions', async () => {
        const res = await request(app).post('/additions/find').send({ arr: 'success' })
        expect(res.statusCode).toBe(200)
        expect(res).toBeDefined()
        expect(res.headers['content-type'])
            .toBe("application/json; charset=utf-8")
    })

    it('should check the mock', async () => {
        const { findAddition } = jest.requireMock('../../../modules/products/additions')
        _ = await request(app).post('/additions/find').send({ arr: 'success' })
        expect(findAddition).toHaveBeenCalled();
    })

    it('should fali finding', async () => {
        const response = await request(app).post('/additions/find').send({ arr: "error" })
        expect(response.statusCode).toBe(500)
    })
})