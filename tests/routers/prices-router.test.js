jest.mock('../../modules/price-list/prices', () => {
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
        }),
        addPriceList: jest.fn(() => {
            return true
        }),
        updatePriceList: jest.fn(() => {
            return "good"
        }),
        deletePriceList: jest.fn(() => {
            return "delete"
        })
    }
})



const request = require('supertest')
const { app } = require('../../app')

describe('GET APIs', () => {
    it('/findAreaAndPriceByItemCode', async () => {
        const response = await request(app).get('/prices/findAreaAndPriceByItemCode/1')
        const method = jest.requireMock('../../modules/price-list/prices')
        expect(method.selectAreaAndPriceByItemCode).toHaveBeenCalled()
        expect(method.selectAreaAndPriceByItemCode).toHaveBeenCalledTimes(1)
        expect(response).toBeDefined();
    })
    it('/findProductAndPricesByAreaName', async () => {
        const response = await request(app).get('/prices/findProductAndPricesByAreaName/ashdod')
        const method = jest.requireMock('../../modules/price-list/prices')
        expect(method.selectAreaAndPriceByItemCode).toHaveBeenCalled()
        expect(method.selectAreaAndPriceByItemCode).toHaveBeenCalledTimes(1)
        expect(response).toBeDefined();
    })
    it('/findProductByAreaName', async () => {
        const response = await request(app).get('/prices/findProductByAreaName')
        const method = jest.requireMock('../../modules/price-list/prices')
        expect(method.selectProductByAreaName).toHaveBeenCalled()
        expect(method.selectProductByAreaName).toHaveBeenCalledTimes(1)
        expect(response).toBeDefined();
    })
    it('/findAreaByClientOrSupplyCode', async () => {
        const response = await request(app).get('/prices/findAreaByClientOrSupplyCode/1')
        const method = jest.requireMock('../../modules/price-list/prices')
        console.log(method);
        expect(method.selectAreaByClientOrSupplyCode).toHaveBeenCalled()
        expect(method.selectAreaByClientOrSupplyCode).toHaveBeenCalledTimes(1)
        expect(response).toBeDefined();
    })
    // it('/findAllAreas', async () => {
    //     const response = await request(app).get('/prices/findAllAreas/5')
    //     const method = jest.requireMock('../../modules/price-list/prices')
    //     expect(method.selectAllAreas).toHaveBeenCalled()
    //     expect(method.selectAllAreas).toHaveBeenCalledTimes(1)
    //     expect(response).toBeDefined();
    // })


})


describe('POST APIs', () => {
    it('/addPriceList', async () => {
        const response = await request(app).post('/prices/addPriceList', { name: 'shoshi', age: 5 })
        const method = jest.requireMock('../../modules/price-list/prices')
        expect(method.addPriceList).toHaveBeenCalled()
        expect(method.addPriceList).toHaveBeenCalledTimes(1)
        expect(response).toBeDefined();

    })
    it('/updatePriceList', async () => {
        const response = await request(app).post('/prices/updatePriceList', { name: 'shoshi', age: 8 })
        const method = jest.requireMock('../../modules/price-list/prices')
        expect(method.updatePriceList).toHaveBeenCalled()
        expect(method.updatePriceList).toHaveBeenCalledTimes(1)
        expect(response).toBeDefined();

    })
    it('/deletePriceList', async () => {
        jest.setTimeout(async () => {
            const response = await request(app).post('/prices/deletePriceList', { name: 'shoshi', delete: 1 })
            const method = jest.requireMock('../../modules/price-list/prices')
            expect(method.deletePriceList).toHaveBeenCalled()
            expect(method.deletePriceList).toHaveBeenCalledTimes(1)
            expect(response).toBeDefined();
        }, 5000);



    })


})