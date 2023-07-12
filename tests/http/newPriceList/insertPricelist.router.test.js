const request = require('supertest');
const { app } = require('../../../app')

// const { insert} = require('../../../modules/pricelist/insertPricelist')
jest.mock('../../../modules/pricelist/insertPricelist', () => {
    return {
        insert: jest.fn((obj) => {
            if (obj.name && obj.userName)
                return true
            else {
                throw new Error('one or more details are missing. the creation was fail.')
            }
        })
    }
})

describe('insert base price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addPriceList').send({ name: "pricelist1", userName: "Avi" });
        expect(response.statusCode).toBe(200);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    it('should execute insert once', async () => {
        const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
        _ = await request(app).post('/creatPricelist/addPriceList').send({ name: "pricelist1", userName: "Avi" });
        expect(insert).toHaveBeenCalled();
    })

    it('should return an error for object that not include the must fields ', async () => {
        const response = await request(app).post('/creatPricelist/addPriceList', {});
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        // expect(response.notFound).toBeTruthy();
        expect(response.serverError).toBeTruthy();
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        const response = await request(app).post('/creatPricelist/addPriceList', { name: "pricelist1", userName: "Avi" })
        expect(response.headers['content-type'])
            .toBe("text/html; charset=utf-8")
        expect(response).toBeTruthy()
    })
})

// // ///////////////////addCitiesAdditions
describe('insert additions for city to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addCitiesAdditions').send({ name: "pricelist1", userName: "Avi", city: "Jerusalem" });
        expect(response.statusCode).toBe(200);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    // it('should execute insert once ', async () => {
    //     const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist')
    //     _ = await request(app).post('/creatPricelist/addCitiesAdditions', { name: "pricelist1", userName: "Avi", price: 3000 })
    //     expect(insert).toHaveBeenCalled();
    // })

    it('should return an error for object that not include the must fields ', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addCitiesAdditions', { city: "Ashdod", price: 2000 });
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000);

    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addCitiesAdditions', { name: "pricelist1", userName: "Avi", city: "Tel-Aviv" })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);

    })
})
// // /////////////////////////////////////////////////addTimeAdditions
describe('insert additions for time to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addTimeAdditions').send({ name: "pl4", userName: "Dan", price: 6090 });
        expect(response.statusCode).toBe(200);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })

    it('should execute insert once ', async () => {
        jest.setTimeout(async _ => {
            const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist')
            _ = await request(app).post('/creatPricelist/addTimeAdditions', { name: "pl4", userName: "Dan", price: 6090 })
            expect(insert).toHaveBeenCalled();
        }, 6000);

    })
    it('should return an error for object that not include the must fields ', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addTimeAdditions', { name: "Mosh" });
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            // expect(response.notFound).toBeTruthy();
            expect(response.serverError).toBeTruthy();
        }, 6000);

    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addTimeAdditions', { name: "pl4", userName: "Dan", price: 30000 })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })
})

describe('insert additions for distance to price list', () => {
    // ///////////////////////////////////////addAdditionsForDistance
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addAdditionsForDistance').send({ name: "pl2", userName: "Rami", distance: 80 });
        expect(response.statusCode).toBe(200);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })

    it('should execute insert once', async () => {
        jest.setTimeout(async _ => {
            const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
            _ = await request(app).post('/creatPricelist/addAdditionsForDistance').send({ name: "pl2", userName: "Rami", distance: 80 });
            expect(insert).toHaveBeenCalled();
        }, 6000)
    })

    it('should return an error for object that not include the must fields ', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addAdditionsForDistance', { distance: 80 });
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000)
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addAdditionsForDistance', { name: "pricelist1", userName: "Ramy", price: 50000 })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000)
    })
})

//////////////////////////////////addTruckFill
describe('insert additions for truck fill to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addTruckFill').send({ name: "pricelist1", userName: "Rony", price: 3000 });
        expect(response.statusCode).toBe(200);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    it('should execute insert once ', async () => {
        jest.setTimeout(async _ => {
            const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist')
            _ = await request(app).post('/creatPricelist/addTruckFill', { name: "pricelist1", userName: "Rony", price: 6090 })
            expect(insert).toHaveBeenCalled();
        }, 6000);
    })

    it('should return a json object', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addTruckFill', { clientCode: '123', clientName: 'Gidon' })
            expect(response.headers['content-type'])
                .toBe("application/json; charset=utf-8")
        }, 6000);
    })
})

// describe('insert additions for supplier or client to price list', () => {
//     //  ////////////////////////////////addPricesListBySupplierOrClient
//     it('shuold insert the object to db', async () => {
//         const res = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient').send({ name: "tamy", customerCode: 1000 ,clientCode:"32467"})
//         expect(res.statusCode).toBe(200)
//         expect(res).toBeDefined()
//     })


//     it('should execute insert once ', async () => {
//         const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist')
//         const res = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient', { clientCode: '123', clientName: 'Gidon' })
//         expect(insert).toHaveBeenCalled();
//         expect(res).toBeDefined()
//     })

//     it('should return a json object', async () => {
//         const response = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient', { clientCode: '123', clientName: 'Gidon' })
//         expect(response.headers['content-type'])
//             .toBe("application/json; charset=utf-8")
//     })
// })
// describe('insert products to price list', () => {
//     it('shuold insert the object to db', async () => {
//         const res = await request(app).post('/creatPricelist/addPricelistForProducts').send({ name: "tamy", customerCode: 1000, clientCode: "32467" })
//         expect(res.statusCode).toBe(200)
//         expect(res).toBeDefined()
//         expect(res.headers['content-type'])
//             .toBe("application/json; charset=utf-8")
//     })
    // it('should execute insert once ', async () => {
    //     jest.setTimeout(5000)
    //     const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist')
    //     _ = await request(app).post('/creatPricelist/addPricelistForProducts', { clientCode: '123', clientName: 'Gidon' })
    //     expect(insert).toHaveBeenCalled();
    // })

    // it('should return a json object', async () => {
    //     jest.setTimeout(5000)
    //     const response = await request(app).post('/creatPricelist/addPricelistForProducts').send({ name: "error" })
    //     // expect(response).toBe
    //     expect(response.statusCode).toBe(500)

    // })
// })

// describe('insert finish products to price list', () => {
//     it('should insert the object to db', async () => {
//         const response = await request(app).post('/creatPricelist/addPricelistForFinishProducts', {clientCode:"32467", name: "1" })
//         expect(response.statusCode).toBe(200)
//         expect(response).toBeDefined()
//     })
// })