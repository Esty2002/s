const request = require('supertest');
const { app } = require('../../../app')

// const { } = require('../../../modules/products/measure')
jest.mock('../../../modules/products/measure', () => {
    return {
        insertMeasure: jest.fn((obj) => {
            if (obj == 'Array of Errors') {
                let a = new Error('wow1')
                let b = new Error('wow2')
                throw [a.message, b.message]
            }
            if (obj == "error") {
                throw new Error('wow')
            }
            else
                return { status: 201 }
        }),
        getAll: jest.fn(() => {
            
            return { data: [{ Id: 1, Measure: "mmm", Disable: true }, { Id: 2, Measure: "aaa", Disable: false }], status: 200 }
        }),
        findMeasureName: jest.fn((obj) => {
            if (parseInt(obj) === -1)
                throw new Error('no matching unit of measure')

            if (parseInt(obj))
                return { data: [{ Measure: 'success' }], status: 200 }

            throw new Error('The id of the unit of measure is reuired with type int')
        }),
        findMeasureNumber: jest.fn((obj) => {
            console.log({obj});
            if (obj === 'error')
                throw new Error('no matching unit of measure')
            return { data: [{ Id: 1 }], status: 200 }
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

describe('/unitOfMeasure/create', () => {

    it('shuold insert an unitOfMeasure', async () => {
        const res = await request(app).post('/unitOfMeasure/create').send({ new: "success" })
        expect(res.statusCode).toBe(201)
        expect(res).toBeDefined()
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
    it('should check the mock logToFile', async () => {
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt')
        _ = await request(app).get('/unitOfMeasure/all')
        expect(logToFile).toHaveBeenCalled();
    })

})

describe('/unitOfMeasure/all', () => {

    it('shuold find all the unit of measures', async () => {
        const res = await request(app).get('/unitOfMeasure/all')
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(200)
        expect(res.body).toStrictEqual([{ "Id": 1, "Measure": "mmm", "Disable": true }, { "Id": 2, "Measure": "aaa", "Disable": false }])
        expect(res.body).toBeInstanceOf(Array)
        expect(res.headers['content-type']).toBe("application/json; charset=utf-8")
    })

    it('should check the mock', async () => {
        const { getAll } = jest.requireMock('../../../modules/products/measure')
        _ = await request(app).get('/unitOfMeasure/all')
        expect(getAll).toHaveBeenCalled();
    })
    it('should check the mock logToFile', async () => {
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt')
        _ = await request(app).get('/unitOfMeasure/all')
        expect(logToFile).toHaveBeenCalled();
    })

    // it('should fali finding', async () => {
    //     const res = await request(app).get('/unitOfMeasure/all')
    //     expect(res.statusCode).toBe(500)
    // })

})

describe('/unitOfMeasure/findMeasureName', () => {

    it('shuold findMeasureName', async () => {
        const res = await request(app).get(`/unitOfMeasure/findMeasureName/1`)
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("\"success\"")
    })

    it('should check the mock', async () => {
        const { findMeasureName } = jest.requireMock('../../../modules/products/measure')
        _ = await request(app).get('/unitOfMeasure/findMeasureName')
        expect(findMeasureName).toHaveBeenCalled();
    })

    it('should check the mock logToFile', async () => {
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt')
        _ = await request(app).get('/unitOfMeasure/findMeasureName')
        expect(logToFile).toHaveBeenCalled();
    })

    it('should fali finding because there is no unit of measure with the given id', async () => {
        let res = ''
        try {
            res = await request(app).get(`/unitOfMeasure/findMeasureName/-1`)
        }
        catch (error) {
            expect(res.statusCode).toBe(500)
            expect(res).toBe('')
            expect(error).toBeDefined()
            expect(error.message).toBe('no matching unit of measure')
            expect(error).toBeInstanceOf(Error)
        }
    })

    it('should fali finding because the params is not in the right format', async () => {
        let res = ''
        try {
            res = await request(app).get('/unitOfMeasure/findMeasureName/fdgf')
        }
        catch (error) {
            expect(res.statusCode).toBe(500)
            expect(res).toBe('')
            expect(error).toBeDefined()
            expect(error.message).toBe('The id of the unit of measure is reuired with type int')
            expect(error).toBeInstanceOf(Error)
        }
    })
})
describe('/unitOfMeasure/findMeasureId', () => {

    it('shuold findMeasureId', async () => {
        const res = await request(app).get(`/unitOfMeasure/findMeasureId?name=mmm`)
        expect(res).toBeDefined()
        expect(res.statusCode).toBe(200)
        expect(res.text).toBe("1")
    })

    it('should check the mock', async () => {
        const { findMeasureNumber } = jest.requireMock('../../../modules/products/measure')
        _ = await request(app).get('/unitOfMeasure/findMeasureId?name=mmm')
        expect(findMeasureNumber).toHaveBeenCalled();
    })

    it('should check the mock logToFile', async () => {
        const { logToFile } = jest.requireMock('../../../services/logger/logTxt')
        _ = await request(app).get('/unitOfMeasure/findMeasureId?name=mmm')
        expect(logToFile).toHaveBeenCalled();
    })

    it('should fali finding because there is no unit of measure with the given name', async () => {
        let res = ''
        try {
            res = await request(app).get(`/unitOfMeasure/findMeasureId?name=error`)
        }
        catch (error) {
            expect(res.statusCode).toBe(500)
            expect(res).toBe('')
            expect(error).toBeDefined()
            expect(error.message).toBe('no matching unit of measure')
            expect(error).toBeInstanceOf(Error)
        }
    })

})


