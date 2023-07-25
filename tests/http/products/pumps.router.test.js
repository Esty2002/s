const request = require('supertest');
const { app } = require('../../../app')

// const { } = require('../../../modules/products/pumps')
jest.mock('../../../modules/products/pumps', () => {
    return {
        insertPump: jest.fn((obj) => {
            if (obj.name == 'Array of Errors') {
                let a = new Error('wow1')
                let b = new Error('wow2')
                throw [a.message, b.message]
            }
            if (obj.name == "error")
                throw new Error('wow')
            else
                return { status: 201 }
        }),
        findPump: jest.fn((obj) => {
            if (obj == 'Array of Errors') {
                let a = new Error('wow1')
                let b = new Error('wow2')
                throw [a.message, b.message]
            }
            if (obj == "error")
                throw new Error('wow')
            else
                return { status: 200 }
        })
    }
})
jest.mock('../../../services/logger/logTxt', () => {
    return {
        logToFile: jest.fn((obj) => {
            let a = obj
        }),
    }
});

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
    it('should fali inserting because of validations', async () => {
        let response = ''
        try {
            response = await request(app).post('/pumps/create').send({ name: "Array of Errors" })
            expect(response.statusCode).toBe(500)
        }
        catch (error) {
            expect(error).toBeInstanceOf(Array)
        }
    })
    it('should check the mock logToFile', async () => {
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt')
        _ = await request(app).get('/pumps/create')
        expect(logToFile).toHaveBeenCalled();
    })

})

describe('/pumps/find', () => {

    it('shuold find pumps', async () => {
        const res = await request(app).post('/pumps/find').send({ arr: 'success' })
        expect(res.statusCode).toBe(200)
        expect(res).toBeDefined()
        // expect(res.headers['content-type'])
        //     .toBe("application/json; charset=utf-8")
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
    it('should fali finding because of validations', async () => {
        let response = ''
        try {
            const response = await request(app).post('/pumps/find').send({ arr: "Array of Errors" })
            expect(response.statusCode).toBe(500)
        }
        catch (error) {
            expect(error).toBeInstanceOf(Array)
        }
    })
    it('should check the mock logToFile', async () => {
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt')
        _ = await request(app).get('/pumps/find')
        expect(logToFile).toHaveBeenCalled();
    })

})