const request = require('supertest')
const { app } = require('../../../app')
const { createQuotation } = require('../../../modules/quotation/create')
const { INET } = require("sequelize");

jest.mock('../../../services-quotation/sql/sql-operations', () => {
    return {
        insert: jest.fn((obj) => {
            return true

        })
    }

})

jest.mock('../../../modules/quotation/create', () => {
    return {
        insertQuotation: jest.fn((obj) => {

            if (obj.newQuotation == undefined || obj.items == undefined || obj.items.length == 0 || !obj.newQuotation.clientCode || !obj.newQuotation.VATPercent || !obj.newQuotation.user || !obj.newQuotation.payoffDate) {
                return "lali"
            }
            else
                return "Landau"
        })
    }

})


describe('INSERT THE DATA TO THE DB', () => {

    //     it('should the function will throw error when the data will not be correct', async () => {
    //         const { insertQuotation } = jest.requireMock('../../../modules/quotation/create');
    //         const response = await insertQuotation();
    //         expect(insertQuotation).toHaveBeenCalled();
    //         expect(response).toBeTruthy();
    //         expect(response.serverError).toBeFalsy()
    // })
    it('should the function insertQuotation have been called', async () => {
        // const { insertQuotation } = jest.requireMock('../../../modules/quotation/create');
        // try{
        const response = await createQuotation({ newQuotation: { clientCode: 1, discountPercent: 10, VATPercent: 17, userName: 3, comments: "bg", contact: "Lali", payoffDate: "12/03/2023", closingComments: "bfvd" }, items: [{ price: 10 }, { price: 20 }] });
        // expect(insertQuotation).toHaveBeenCalled();
        expect(response).toBeTruthy();
        expect(response.serverError).toBeFalsy()
        // }
        // catch(error){
        // expect(error).toBeInstanceOf(Error);
        // }
    })
})
