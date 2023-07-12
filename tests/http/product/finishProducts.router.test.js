const request = require('supertest');
const { app } = require('../../../app')

// const { } = require('../../../modules/products/finishProducts')
jest.mock('../../../modules/products/finishProducts', () => {
    return {
        insertFinishProduct: jest.fn((obj) => {
            if (obj.name == "error")
                throw new Error('wow')
            else
                return true
        }),
        findFinishProduct: jest.fn((obj) => {
            if (obj == "error")
                throw new Error('wow')
            else
                return true
        }),
    }
})

describe('/finishProducts/create', () => {

    it('shuold insert a new finished product', async () => {
        const res = await request(app).post('/finishProducts/create').send({ name: "success" })
        expect(res.statusCode).toBe(201)
        expect(res).toBeDefined()
        expect(res.headers['content-type'])
            .toBe("application/json; charset=utf-8")
    })

    it('should check the mock', async () => {
        const { insertFinishProduct } = jest.requireMock('../../../modules/products/finishProducts')
        _ = await request(app).post('/finishProducts/create').send({ name: "success" })
        expect(insertFinishProduct).toHaveBeenCalled();
    })

    it('should fali inserting', async () => {
        const response = await request(app).post('/finishProducts/create').send({ name: "error" })
        expect(response.statusCode).toBe(500)

    })
})

describe('/finishProducts/find', () => {

    it('shuold find finished products', async () => {
        const res = await request(app).post('/finishProducts/find').send({ arr: 'success' })
        expect(res.statusCode).toBe(200)
        expect(res).toBeDefined()
        expect(res.headers['content-type'])
            .toBe("application/json; charset=utf-8")
    })

    it('should check the mock', async () => {
        const { findFinishProduct } = jest.requireMock('../../../modules/products/finishProducts')
        _ = await request(app).post('/finishProducts/find').send({ arr: 'success' })
        expect(findFinishProduct).toHaveBeenCalled();
    })

    it('should fali finding', async () => {
        const response = await request(app).post('/finishProducts/find').send({ arr: "error" })
        expect(response.statusCode).toBe(500)

    })
})