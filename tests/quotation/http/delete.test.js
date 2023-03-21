const request = require('supertest')

const { app } = require('../../app')


jest.mock('../../modules/quotation/delete', () => {
    return {
        Delete: jest.fn((table) => {
            if ((table === "quotation") || (table === "quotationItems")) {
                console.log('table found');
                return table
            }
            else {
                console.log('not exist');
                throw new Error('this table does not exist')
            }
        })
    }
})

describe('POST - DELETE QUOTATION ITEMS', () => {
    it('post /deleteQuotationItems is found', async () => {
        const response = await request(app).post('/quotation/deleteQuotationItems').send(table = "quotation")
        expect(response).toBeDefined()
        expect(response).toBeTruthy()
        expect(response.statusCode).toBe(200)
        expect(response.serverError).toBeFalsy()
        // expect(response.text).toBe("qoutation")
        expect(response.notFound).toBeFalsy()
    })

    it('should call function Delete in modules', async () => {
        const method = jest.requireMock('../../modules/quotation/delete')
        const response = await request(app).post('/quotation/deleteQuotationItems').send(table = "quotationItems")
        expect(method.Delete).toHaveBeenCalled()
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
        const response = await request(app).post('/delete/deleteQuotationItems')
        expect(response.notFound).toBeTruthy()
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
    })
})


describe('GET APIs', () => {
    it('/ path should return a welcome message', async () => {
        const response = await request(app).get('/quotation')
        expect(response.notFound).toBeFalsy()
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
    })
})

