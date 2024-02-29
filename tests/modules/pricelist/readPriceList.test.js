
const request = require('supertest');
const { app } = require('../../../app');


jest.mock('../../../modules/pricelist/readPricelist', () => {
    return {
        getPriceListbyProduct: jest.fn((id) => {
            if (id == 1) {
                return true;
            }
            else {
                throw new Error('eroor');
            }
        }),
        getAllPriceList: jest.fn(() => {
            return 'true';
        }),
        getPriceListByAdditionsForCities: jest.fn((city) => {
            if (city == 1) {
                return 'true';
            }
            else {
                throw new Error('eroor');
            }
        }),
        getPriceListByAdditionsForDistance: jest.fn((id) => {
            if (id == 1) {
                return 'true';
            }
            else {
                throw new Error('eroor');
            }
        }),
        getPriceListByAdditionsForTruckFill: jest.fn((id) => {
            if (id == 1) {
                return 'true';
            }
            else {
                throw new Error('eroor');
            }
        }),
        getPriceListByAdditionsForTime: jest.fn((id) => {
            if (id == 1) {
                return 'true';
            }
            else {
                throw new Error('eroor');
            }
        }),

        getCustomersAndAreasForPriceList: jest.fn((id) => {
            if (id == 1) {
                return 'true';
            }
            else {
                throw new Error('eroor');
            }
        }),
        getPriceListByIdPriceListId: jest.fn((id) => {
            if (id == 1) {
                return 'true';
            }
            else {
                throw new Error('eroor');
            }
        }),
        getSupplierByNameProduct: jest.fn((table,name) => {
            if (table == 'tbl_Pumps' && name == 'aaa') {
                return true;
            }
            else {
                throw new Error('eroor');
            }

        }),
        getSupplierByNameProductBuyton: jest.fn((table, name) => {
            if (table == 'tbl_Pumps' && name == 'ere') {
                return true;
            }
            else {
                throw new Error('eroor');
            }
        }),
    }
})


// beforeAll(() => {
//     server = app.listen('1530');
// })

describe(('GET ALLPRICELIST '), () => {
    it('get("/readpricelist/findAllPriceList") returns an answer if get from find pricelist obj', async () => {
        const response = await request(app).get('/readPricelist/findAllPriceList');
        const { getAllPriceList } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getAllPriceList).toHaveBeenCalled()
        // expect(getAllPriceList).toHaveBeenCalledTimes(1)
        expect(response.statusCode).toBe(200);
        expect(response.notFound).toBeFalsy();
    })
    it('get("/readpricelist/findAllPriceList") returns an answer if get from find pricelist obj', async () => {
        const response = await request(app).get('/readPricelist/findAllPriceList');
        expect(response.data).toBe(undefined);
        expect(response.notFound).toBeFalsy();
    })
})



describe(('GET FindPriceListByProduct'), () => {
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindPriceListByProduct/1');
        const { getPriceListByIdPriceListId } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getPriceListByIdPriceListId).toHaveBeenCalled()
        expect(response.statusCode).toBe(200);
        expect(response.notFound).toBeFalsy();
    })
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindPriceListByProduct/tovi');
        const { getPriceListByIdPriceListId } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getPriceListByIdPriceListId).toBeCalled();
        expect(response.statusCode).toBe(500);
        expect(response.notFound).toBeFalsy();
    })

})

describe(('GET FindPriceListByAdditionsForCities'), () => {
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindPriceListByAdditionsForCities/1');
        const { getPriceListByAdditionsForCities } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getPriceListByAdditionsForCities).toHaveBeenCalled()
        expect(response.statusCode).toBe(200);
        expect(response.notFound).toBeFalsy();
    })
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindPriceListByAdditionsForCities/tovi');
        const { getPriceListByAdditionsForCities } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getPriceListByAdditionsForCities).toBeCalled();
        expect(response.statusCode).toBe(500);
        expect(response.notFound).toBeFalsy();
    })

})
describe(('GET FindPriceListByAdditionsForTruckFill'), () => {
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindPriceListByAdditionsForTruckFill/1');
        const { getPriceListByAdditionsForTruckFill } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getPriceListByAdditionsForTruckFill).toHaveBeenCalled()
        expect(response.statusCode).toBe(200);
        expect(response.notFound).toBeFalsy();
    })
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindPriceListByAdditionsForTruckFill/tovi');
        const { getPriceListByAdditionsForTruckFill } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getPriceListByAdditionsForTruckFill).toBeCalled();
        expect(response.statusCode).toBe(500);
        expect(response.notFound).toBeFalsy();
    })

})



describe(('GET FindPriceListByAdditionsForDistance'), () => {
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindPriceListByAdditionsForDistance/1');
        const { getPriceListByAdditionsForDistance } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getPriceListByAdditionsForDistance).toHaveBeenCalled()
        expect(response.statusCode).toBe(200);
        expect(response.notFound).toBeFalsy();
    })
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindPriceListByAdditionsForDistance/tovi');
        const { getPriceListByAdditionsForDistance } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getPriceListByAdditionsForDistance).toBeCalled();
        expect(response.statusCode).toBe(500);
        expect(response.notFound).toBeFalsy();
    })

})


describe(('GET FindPriceListByAdditionsForTime'), () => {
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindPriceListByAdditionsForTime/1');
        const { getPriceListByAdditionsForTime } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getPriceListByAdditionsForTime).toHaveBeenCalled()
        expect(response.statusCode).toBe(200);
        expect(response.notFound).toBeFalsy();
    })
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindPriceListByAdditionsForTime/tovi');
        const { getPriceListByAdditionsForTime } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getPriceListByAdditionsForTime).toBeCalled();
        expect(response.statusCode).toBe(500);
        expect(response.notFound).toBeFalsy();
    })

})
describe(('GET FindPriceListByIdSupplierOrClientCode'), () => {
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindPriceListByIdSupplierOrClientCode/1');
        const { getCustomersAndAreasForPriceList } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getCustomersAndAreasForPriceList).toHaveBeenCalled()
        expect(response.statusCode).toBe(200);
        expect(response.notFound).toBeFalsy();
    })
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindPriceListByIdSupplierOrClientCode/tovi');
        const { getCustomersAndAreasForPriceList } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getCustomersAndAreasForPriceList).toBeCalled();
        expect(response.statusCode).toBe(500);
        expect(response.notFound).toBeFalsy();
    })

})
describe(('GET FindSupplierByNameProduct'), () => {
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindSupplierByNameProduct/tbl_Pumps/aaa');
        const { getSupplierByNameProduct } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getSupplierByNameProduct).toHaveBeenCalled()
        expect(response.statusCode).toBe(200);
        expect(response.notFound).toBeFalsy();
    })
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindSupplierByNameProduct/dddd/dddd');
        const { getSupplierByNameProduct } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getSupplierByNameProduct).toBeCalled();
        expect(response.statusCode).toBe(500);
        expect(response.notFound).toBeFalsy();
    })

})

describe(('GET FindSupplierByNameProductBuyton'), () => {
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindSupplierByNameProductBuyton/tbl_Pumps/ere');
        const { getSupplierByNameProductBuyton } = jest.requireMock('../../../modules/pricelist/readPricelist');
        console.log(getSupplierByNameProductBuyton);
        console.log('===========================================================');
        expect(getSupplierByNameProductBuyton).toHaveBeenCalled()
        expect(response.statusCode).toBe(200);
        expect(response.notFound).toBeFalsy();
    })
    it('readpricelist by product id', async () => {
        const response = await request(app).get('/readPricelist/FindSupplierByNameProductBuyton/tbl_Pumps/tov');
        const { getSupplierByNameProductBuyton } = jest.requireMock('../../../modules/pricelist/readPricelist');
        expect(getSupplierByNameProductBuyton).toBeCalled();
        expect(response.statusCode).toBe(500);
        expect(response.notFound).toBeFalsy();
    })

})








