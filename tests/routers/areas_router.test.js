// jest.mock('../../modules/prices', () => {
//     return {
//         selectAreaAndPriceByItemCode: jest.fn(() => {
//             return [{ areaName: 'ashdod', price: 500 }, { areaName: 'jerusalem', price: 600 }]
//         }),
//         selectProductAndPricesByAreaName: jest.fn(() => {
//             return [{ itemCode: 1, price: 30 }, { itemCode: 2, price: 60 }];
//         }),
//         selectProductByAreaName: jest.fn(() => {
//             return [{ itemCode: 1 }, { itemCode: 2 }];
//         }),
//         selectAreaByClientOrSupplyCode: jest.fn(() => {
//             return [{ areaName: 'elad' }];
//         }),
//         selectAllAreas: jest.fn(() => {
//             return [{ areaName: 'ashdod' }, { areaName: 'jerusalem' }, { areaName: 'elad' }]
//         }),
//         addPriceList: jest.fn(() => {
//             return true
//         }),
//         updatePriceList: jest.fn(() => {
//             return "good"
//         }),
//         deletePriceList: jest.fn(() => {
//             return "delete"
//         })
//     }
// })



jest.mock('../../modules/price-list/areas', () => {
    return {
        findAreaByCode: jest.fn(() => {
            return { areasList: [{ areaName: "ashdod", point: 12, radius: 12, delete: false }, { areaName: "jerusalem", point: 45, radius: 10, delete: false }] }
        })
    }
})

const request = require('supertest')

const { app } = require('../../app')


 

describe('GET APIs', () => {
    it('/findAreasByCode', async () => {
        const response = await request(app).get('/areas/findAreasByCode/1')
        const method = jest.requireMock('../../modules/price-list/areas')
        // expect(method.findAreaByCode).toHaveBeenCalled()
        expect(method.findAreaByCode).toHaveBeenCalledTimes(1)
        expect(response.notFound).toBeFalsy()
        expect(response.statusCode).toBe(200)
        expect(response).toBeDefined();

       
    })



})

