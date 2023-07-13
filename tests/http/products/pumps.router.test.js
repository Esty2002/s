const request = require('supertest');
const { app } = require('../../../app')

// const { } = require('../../../modules/products/pumps')
jest.mock('../../../modules/products/pumps', () => {
    return {
        insertPump: jest.fn((obj) => {
            if (obj.name == "error")
                throw new Error('wow')
            else
                return true
        }),
        findPump: jest.fn((obj) => {
            if (obj == "error")
                throw new Error('wow')
            else
                return true
        })
    }
})

describe('/pumps/create', () => {

    it('shuold insert a new pump', async () => {
        const res = await request(app).post('/pumps/create').send({ name: "success" })
        expect(res.statusCode).toBe(201)
        expect(res).toBeDefined()
        expect(res.headers['content-type'])
            .toBe("application/json; charset=utf-8")
    })

    it('should check the mock', async () => {
        const { insertPump } = jest.requireMock('../../../modules/products/pumps')
        _ = await request(app).post('/pumps/create').send({ name: "success" })
        expect(insertPump).toHaveBeenCalled();
    })

    it('should fali inserting', async () => {
        const response = await request(app).post('/pumps/create').send({ name: "error" })
        expect(response.statusCode).toBe(500)
    })
})

describe('/pumps/find', () => {

    it('shuold find pumps', async () => {
        const res = await request(app).post('/pumps/find').send({ arr: 'success' })
        expect(res.statusCode).toBe(200)
        expect(res).toBeDefined()
        expect(res.headers['content-type'])
            .toBe("application/json; charset=utf-8")
    })

    it('should check the mock', async () => {
        const { findPump } = jest.requireMock('../../../modules/products/pumps')
        _ = await request(app).post('/pumps/find').send({ arr: 'success' })
        expect(findPump).toHaveBeenCalled();
    })

    it('should fali finding', async () => {
        const response = await request(app).post('/pumps/find').send({ arr: "error" })
        expect(response.statusCode).toBe(500)
    })
})