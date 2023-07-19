const request = require('supertest')
const { app } = require('../../../app')

jest.mock('../../../modules/quotation/create', () => {
    return {
        createQuotation: jest.fn((obj) => {
            if (obj.newQuotation == undefined || obj.items == undefined || obj.items.length == 0 || !obj.newQuotation.clientCode || !obj.newQuotation.VATPercent || !obj.newQuotation.user || !obj.newQuotation.payoffDate) {
                return false
            }
            return true
        })
    }

})


describe('QUOTATIONROUTER',()=>{
    it('should connect to the quotation router', async () => {
        const response = await request(app).get('/quotation')
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();

    })
})


describe('CREATEQUOTATION', () => {
    it('should insert succesfuly the data when the data was sent well', async () => {
        const response = await request(app).post('/quotation/create').send({ newQuotation: { clientCode: 1, discountPercent: 10, VATPercent: 17, userName: 3, comments: "bg", contact: "Lali", payoffDate: "12/03/2023", closingComments: "bfvd" }, items: [{ price: 10 }, { price: 20 }] })
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();

    })

    it('should call to the function createQuotation even the data was not sent well  ', async () => {
        const response = await request(app).post('/quotation/create').send({})
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();

    })

    it('should the function createQuotation have been called', async () => {
        const { createQuotation } = jest.requireMock('../../../modules/quotation/create');
        expect(createQuotation).toHaveBeenCalled();
        const response = await request(app).post('/quotation/create').send({ newQuotation: { clientCode: 1, discountPercent: 10, VATPercent: 17, userName: 3, comments: "bg", contact: "Lali", payoffDate: "12/03/2023", closingComments: "bfvd" }, items: [{ price: 10 }, { price: 20 }] })
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

})

