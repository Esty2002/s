const request = require('supertest');
const { app } = require('../../../app');


jest.mock('../../../modules/pricelist/updatePricelist', () => {
    return {
        deletePriceList: jest.fn((id) => {
            console.log({id});
        })
    }
})

describe('POST API', () => {
    it('status should be 200 when delete the client from db , ', async () => {
        const response = await request(app).post('/updatePriceList/deletePriceList').send({ id: 11 });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
    })


    it('should execute deletedClientByCode once', async () => {
        const response = await request(app).post('/updatePriceList/deletePriceList').send({ id: 22 });
        const { deletePriceList } = jest.requireMock('../../../modules/pricelist/updatePricelist');
        expect(deletePriceList).toBeCalledTimes(2);
        expect(response.statusCode).toBe(200);
    })



    // it('donst get something', async () => {
    //     const response = await request(app).post('/createClient/add').send({})
    //     const { addOneClient } = jest.requireMock('../../../modules/clients/createClient');
    //     expect(addOneClient).toBeCalled()
    //     expect(response.statusCode).toBe(201);
    // })

})
