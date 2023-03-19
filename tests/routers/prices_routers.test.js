jest.mock('../../modules/prices', () => {
    return {
        selectAreaAndPriceByItemCode: jest.fn(() => {
            return [{ areaName: 'ashdod', price: 500 }, { areaName: 'jerusalem', price: 600 }]
        }),
        selectProductAndPricesByAreaName: jest.fn(() => {
            return [{ itemCode: 1, price: 30 }, { itemCode: 2, price: 60 }];
        }),
        selectProductByAreaName: jest.fn(() => {
            return [{ itemCode: 1 }, { itemCode: 2 }];
        }),
        selectAreaByClientOrSupplyCode: jest.fn(() => {
            return [{ areaName: 'elad' }];
        }),
        selectAllAreas: jest.fn(() => {
            return [{ areaName: 'ashdod' }, { areaName: 'jerusalem' }, { areaName: 'elad' }]
        })
    }
})

const request = require('supertest')
const { app } = require('../../app')
const expenses = require('../../routers/prices-router')

describe('GET APIs', () => {
    it('/findAreaAndPriceByItemCode', async () => {
        const response = await request(app).get('/prices/findAreaAndPriceByItemCode/1')
        const method = jest.requireMock('../../modules/prices')
        expect(method.selectAreaAndPriceByItemCode).toHaveBeenCalled()
        expect(method.selectAreaAndPriceByItemCode).toHaveBeenCalledTimes(1)
        expect(response).toBeDefined();
    })
    it('/findProductAndPricesByAreaName', async () => {
        const response = await request(app).get('/prices/findProductAndPricesByAreaName/ashdod')
        const method = jest.requireMock('../../modules/prices')
        expect(method.selectProductAndPricesByAreaName).toHaveBeenCalled()
        expect(method.selectProductAndPricesByAreaName).toHaveBeenCalledTimes(1)
        expect(response).toBeDefined();
    })
    it('/findProductByAreaName', async () => {
        const response = await request(app).get('/prices/findProductByAreaName/ashdod')
        const method = jest.requireMock('../../modules/prices')
        expect(method.selectProductByAreaName).toHaveBeenCalled()
        expect(method.selectProductByAreaName).toHaveBeenCalledTimes(1)
        expect(response).toBeDefined();
    })
    it('/findAreaByClientOrSupplyCode', async () => {
        const response = await request(app).get('/prices/findAreaByClientOrSupplyCode/1')
        const method = jest.requireMock('../../modules/prices')
        expect(method.selectAreaByClientOrSupplyCode).toHaveBeenCalled()
        expect(method.selectAreaByClientOrSupplyCode).toHaveBeenCalledTimes(1)
        expect(response).toBeDefined();
    })
    it('//findAllAreasByPriceListCodeAndAreaNameAndItemCode', async () => {
        const response = await request(app).get('/findAllAreasByPriceListCodeAndAreaNameAndItemCode/1/ashdod/100')
        const method = jest.requireMock('../../modules/prices')
        // expect(method.selectAllAreas).toHaveBeenCalled()
        // expect(method.selectAllAreas).toHaveBeenCalledTimes(1)
        expect(response).toBeDefined();
    })


})