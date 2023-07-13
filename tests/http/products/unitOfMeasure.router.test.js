const request = require('supertest');
const { app } = require('../../../app')

// const { } = require('../../../modules/products/measure')
jest.mock('../../../modules/products/measure', () => {
    return {
        insertMeasure: jest.fn((obj) => {
            if(obj=='Array of Errors'){
                let a=new Error('wow1')
                let b=new Error('wow2')
                throw [a.message,b.message]
            }
            if (obj == "error") {
                throw new Error('wow')
            }
            else
                return true
        })
    }
})

describe('/unitOfMeasure/create', () => {

    it('shuold insert an unitOfMeasure', async () => {
        const res = await request(app).post('/unitOfMeasure/create').send({ new: "success" })
        expect(res.statusCode).toBe(201)
        expect(res).toBeDefined()
        expect(res.headers['content-type'])
            .toBe("application/json; charset=utf-8")
    })

    it('should check the mock', async () => {
        const { insertMeasure } = jest.requireMock('../../../modules/products/measure')
        _ = await request(app).post('/unitOfMeasure/create').send({ new: "success" })
        expect(insertMeasure).toHaveBeenCalled();
    })

    it('should fali inserting', async () => {
        let response = ''
        try {
            response = await request(app).post('/unitOfMeasure/create').send({ new: "error" })
            expect(response.statusCode).toBe(500)

        }
        catch (error) {
            expect(error.message).toBe('wow')
            expect(error).toBeInstanceOf(Error)
        }
    })
    it('should fali inserting because of validations', async () => {
        let response = ''
        try {
            response = await request(app).post('/unitOfMeasure/create').send({ new: "Array of Errors" })
            expect(response.statusCode).toBe(500)
        }
        catch (error) {
            expect(error).toBeInstanceOf(Array)
        }
    })
})

