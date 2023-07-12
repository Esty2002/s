const request = require('supertest');
const { app } = require('../../../app')

// const { } = require('../../../modules/products/finishProducts')
jest.mock('../../../modules/products/finishProducts', () => {
    return {
        // insertFinishProduct: jest.fn((obj) => {           
        //     if (obj.name=="error")
        //         throw new Error('wow')
        //     else
        //         return true
        // }),
        findFinishProduct: jest.fn((obj) => {
            console.log(obj, 'ooooooooooooooooo');
            if (obj == "error")
                throw new Error('wow')
            else
                return true

        })
    }
})

// describe('/finishProducts/create', () => {

//     it('shuold insert a new finished product', async () => {
//         const res = await request(app).post('/finishProducts/create').send({ name: "success" })
//         expect(res.statusCode).toBe(201)
//         expect(res).toBeDefined()
//         expect(res.headers['content-type'])
//             .toBe("application/json; charset=utf-8")
//     })

// it('should check the mock', async () => {
//     const { insertFinishProduct } = jest.requireMock('../../../modules/products/finishProducts')
//     _ = await request(app).post('/finishProducts/create', { name: "success" })
//     expect(insertFinishProduct).toHaveBeenCalled();
// })

//     it('should fali inserting', async () => {
//         // jest.setTimeout(5000)
//         const response = await request(app).post('/finishProducts/create').send({ name: "error" })
//         expect(response.statusCode).toBe(500)

//     })
// })

describe('/finishProducts/find', () => {

    it('shuold find finished products', async () => {
        const res = await request(app).post('/finishProducts/find').send({ arr: "success", where: "where" })
        expect(res.statusCode).toBe(200)
        expect(res).toBeDefined()
        expect(res.headers['content-type'])
            .toBe("application/json; charset=utf-8")
    })

    it('should check the mock', async () => {
        const { findFinishProduct } = jest.requireMock('../../../modules/products/finishProducts')
        _ = await request(app).post('/finishProducts/find', { arr: "success", where: "where" })
        expect(findFinishProduct).toHaveBeenCalled();
    })

    it('should fail inserting', async () => {
        const res = await request(app).post('/finishProducts/find').send({ arr: "error", where: "where" })
        expect(res.statusCode).toBe(500)

    })
})

