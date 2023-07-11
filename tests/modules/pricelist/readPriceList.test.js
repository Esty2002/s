
const request = require('supertest');
const { app } = require('../../../app');
let server;

jest.mock('../../../modules/pricelist/readPricelist', () => {
    return {
        getPriceListbyProduct: jest.fn(() => {
            console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');

            return 'true';
        }),
        getAllPriceList: jest.fn(() => {
            console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');

            return 'true';
        }),
        getPriceListByAdditionsForCities: jest.fn(() => {
            console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu');
            return 'true';
        }),
    }
})


// beforeAll(() => {
//     server = app.listen('1530');
// })

describe(('GET ALLPRICELIST '), () => {
    it('get("/readpricelist/findAllPriceList") returns an answer if get from find pricelist obj', async () => {
        const response = await request(app).get('/readpricelist/findAllPriceList');
        const methods=jest.requireMock('../../../modules/pricelist/readPriceList');
        expect(methods.getAllPriceList).toHaveBeenCalled(1)
        expect(methods.getAllPriceList).toHaveBeenCalledTimes(1)
        expect(response.statusCode).toBe(200);
        expect(response.notFound).toBeFalsy();
    })
    // it('get("/readpricelist/findAllPriceList") returns an answer if get from find pricelist obj', async () => {
    //     const response = await request(app).get('/readpricelist/findAllPriceList');
    //     const{getAllPriceList}=jest.requireMock('../../../modules/pricelist/readPriceList');
    //     // expect{}
    //     // expect{getAllPriceList}.toBeCalled();
    //     // expect(response.statusCode).toBe(200);
    //     // expect(response.notFound).toBeFalsy();
    // })
    // it('get("/readpricelist/findAllPriceList") returns an answer if get from find pricelist obj', async () => {
    //     const response = await request(app).get('/readpricelist/findAllPriceList');
    //     expect(response.status).toBe(200);
    //     // expect(response.notFound).toBeFalsy();
    // })
})

// describe(('GET PRICELISTBYPRODUCT'), () => {
//     it('readpricelist by product id', async () => {
//         const response = await request(app).get('/readpricelist/FindPriceListByProduct/1');
//         expect(response.statusCode).toBe(200);
//         expect(response.notFound).toBeFalsy();
//     })
//     it('readpricelist by product id', async () => {
//         const response = await request(app).get('/readpricelist/FindPriceListByProduct/tovi');
//         expect(response.text).toBe("request not found");
//         expect(response.notFound).toBeFalsy();
//     })

// })
// describe(('GET FindPriceListByAdditionsForCities'), () => {
//     it('readpricelist by product id', async () => {
//         const response = await request(app).get('/readpricelist/FindPriceListByAdditionsForCities/1');
//         expect(response.statusCode).toBe(200);
//         expect(response.notFound).toBeFalsy();
//     })
//     it('readpricelist by product id', async () => {
//         const response = await request(app).get('/readpricelist/FindPriceListByAdditionsForCities/tovi');
//         const{getPriceListByAdditionsForCities}=jest.requireMock('../../../modules/pricelist/readPriceList');
//         // expect{getPriceListByAdditionsForCities}.toBeCalled();
//         expect(response.text).toBe("request not found");
//         expect(response.notFound).toBeFalsy();
//     })

// })


// describe(('GETSUPPLIERS '), () => {
//     it('get("/suppliers/getSuppliers/uplierCode/12") returns an answer if get from findSupllier obj', async () => {
//         const response = await request(app).get('/suppliers/getSuppliers/SupplierCode/12');
//         expect(response.statusCode).toBe(200);
//         expect(response.notFound).toBeFalsy();
//     })
//     it('should send status 500 if it is not good ', async () => {
//         const response = await request(app).get('/suppliers/getSuppliers/gggg/gggg');
//         expect(response).toBeDefined();
//         expect(response.statusCode).toBe(500);
//     })
// })

// afterAll(() => {
//     server.close();
// })
