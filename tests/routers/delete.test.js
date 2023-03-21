const request = require('supertest')

const { app } = require('../../app')
const { connect } = require('../../services/sql/sql-connection')

// let server

// beforeAll(() => {
//     server = app.listen(3332)
// })

jest.mock('../../modules/quotation/delete', () => {
    return {
        Delete: jest.fn((obj) => {
            if (obj.table != 'quotation' && obj.table != 'quotationItems') {
                console.log('not exist');
                throw new Error('this table does not exist')
            }
            else {
                return obj.table
            }
        })
    }
})

describe('Delete Quotation Items', () => {
    it('post /deleteQuotationItems is found', async () => {
        const response = await request(app).post('/quotation/deleteQuotationItems').send(obj.table = 'quotation')
        expect(response).toBeDefined()
        expect(response).toBeTruthy()
        expect(response.statusCode).toBe(200)
        expect(response.serverError).toBeFalsy()
        // expect(response.text).toBe("qoutation")
        expect(response.notFound).toBeFalsy()
    })

    it('should call function deleteQuotationItems in module', async () => {
        const method = jest.requireMock('../../modules/quotation/delete')
        const response = await request(app).post('quotation/deleteQuotationItems').send(obj.table = 'quotationItems')
        expect(method.deleteQuotationItems).toHaveBeenCalld()
        expect(response).toBeDefined()
        expect(response.error).toBe(false)
        expect(response.notFound).toBeFalsy()
    })

    it('should return status 500 if value not send', async () => {
        const response = await request(app).post('/quotation/deleteQuotationItems').send({})
        expect(response.statusCode).toBe(500)
        expect(response.serverError).toBeTruthy()
        expect(response.notFound).toBe(false)
    })
})


describe('POST APIs', () => {
    it('/ path should delete an item as send', async () => {
        await connect()
        const response = await request(app).post('/delete/deleteQuotationItems')
        expect(response.notFound).toBeFalsy()
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
    })
})


describe('GET APIs', () => {
    it('/ path should return a welcome message', async () => {
        const response = await request(app).get('/delete')
        expect(response.notFound).toBeFalsy()
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
    })
})


// afterAll(() => {
//     server.close()
// })