const request = require('supertest');
const { app } = require('../../../app')
// const { insert} = require('../../../modules/pricelist/insertPricelist')
jest.mock('../../../modules/pricelist/insertPricelist', () => {
    return {
        insert: jest.fn((obj) => {
            if (obj.name == 'Array of Errors') {
                let err1 = new Error('error1')
                let err2 = new Error('error2')
                throw [err1.message, err2.message]
            }
            if (obj.name != 'error')
                return { status: 201 }
            else {
                throw new Error({ status: 500 })
            }
        }),
        getId: jest.fn((name) => {
            if (name != 'error') {
                let result = { data: [5], status: 200 }
                return result
            }
            else {
                let result = { data: [5], status: 500 }
                throw new Error(result)
            }
        }),
        getProducts: jest.fn((tbname) => {
            if (tbname != 'error')
                return { status: 201 };
            else
                throw new Error({ status: 500 })

        }),
        updateField: jest.fn((id) => {
            if (id != 'error') {
                return { status: 204 };
            }
            else
                throw new Error({ status: 500 })
        }),
        getIdForBuytonDescribe: jest.fn((name, tbname) => {
            if (name != 'error') {
                return { status: 201 }
            }
            else {
                throw new Error('you didnt send name or name of preffer table name')
            }
        }),
        getNumber: jest.fn(() => {
            return 1
        })
    }
})

describe('insert base price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addPriceList').send({ name: "pricelist1", userName: "Avi" });
        expect(response.statusCode).toBe(201);
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
        const response = await request(app).post('/creatPricelist/addPriceList').send({ name: "error", userName: "Avi" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        // expect(response.notFound).toBeTruthy();
        expect(response.serverError).toBeTruthy();
    })

    it('should return an error for object that have some worng fields ', async () => {
        const response = await request(app).post('/creatPricelist/addPriceList').send({ name: "Array of Errors", userName: "Avi" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    // it('should return an answer from type text-html, and true for good request', async () => {
    //     const response = await request(app).post('/creatPricelist/addPriceList', { name: "pricelist1", userName: "Avi" })
    //     expect(response.headers['content-type'])
    //         .toBe("json/application; charset=utf-8")
    //     expect(response).toBeTruthy()
    // })

    it('should  return error if the data is not correct', async () => {
        let response;
        const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
        try {
            response = await request(app).post('/creatPricelist/addPriceList', { g: "pricelist1", o: "Avi" })
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(insert).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })
})
/////////////////////addCitiesAdditions
describe('insert additions for city to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addCitiesAdditions').send({ name: "pricelist1", userName: "Avi", city: "Jerusalem" });
        expect(response.statusCode).toBe(201);
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
        const response = await request(app).post('/creatPricelist/addCitiesAdditions').send({ name: "error", userName: "Avi", city: "Jerusalem" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an error for object that have some worng fields ', async () => {
        const response = await request(app).post('/creatPricelist/addCitiesAdditions').send({ name: "Array of Errors", userName: "Avi", city: "Jerusalem" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addCitiesAdditions', { name: "pricelist1", userName: "Avi", city: "Tel-Aviv" })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

    it('should return error if the data is not correct', async () => {
        let response;
        const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
        try {
            response = await request(app).post('/creatPricelist/addCitiesAdditions', { name: "error", o: "Avi" })
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(insert).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })
})
// // /////////////////////////////////////////////////addTimeAdditions
describe('insert additions for time to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addTimeAdditions').send({ name: "pl4", userName: "Dan", price: 6090 });
        expect(response.statusCode).toBe(201);
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
        const response = await request(app).post('/creatPricelist/addTimeAdditions').send({ name: "error", userName: "Dan", price: 6090 });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an error for object that have some worng fields ', async () => {
        const response = await request(app).post('/creatPricelist/addTimeAdditions').send({ name: "Array of Errors", userName: "Dan", price: 6090 });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addTimeAdditions', { name: "pl4", userName: "Dan", price: 30000 })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

    it('should return error if the data is not correct', async () => {
        let response;
        const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
        try {
            response = await request(app).post('/creatPricelist/addTimeAdditions', { name: "error", o: "Avi" })
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(insert).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })
})

// ///////////////////////////////////////addAdditionsForDistance
describe('insert additions for distance to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addAdditionsForDistance').send({ name: "pl2", userName: "Rami", distance: 80 });
        expect(response.statusCode).toBe(201);
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
        const response = await request(app).post('/creatPricelist/addAdditionsForDistance').send({ name: 'error', distance: 80 });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
    })

    it('should return an error for object that have some worng fields ', async () => {
        const response = await request(app).post('/creatPricelist/addAdditionsForDistance').send({ name: "Array of Errors", distance: 80, price: 6090 });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addAdditionsForDistance', { name: "pricelist1", userName: "Ramy", price: 50000 })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000)
    })

    it('should return error if the data is not correct', async () => {
        let response;
        const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
        try {
            response = await request(app).post('/creatPricelist/addAdditionsForDistance', { name: "error", o: "Avi" })
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(insert).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })
})
////////////////////////////////addTruckFill
describe('insert additions for truck fill to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addTruckFill').send({ name: "pricelist1", userName: "Tony", price: 3000 });
        expect(response.statusCode).toBe(201);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    it('should execute insert once ', async () => {
        jest.setTimeout(async _ => {
            const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist')
            _ = await request(app).post('/creatPricelist/addTruckFill', { name: "pricelist1", userName: "Tony", price: 8000, maxFill: 35 })
            expect(insert).toHaveBeenCalled();
        }, 6000);
    })

    it('should return an error for object that not include the must fields ', async () => {
        const response = await request(app).post('/creatPricelist/addTruckFill').send({ name: "error", price: 6090, maxFill: 35 });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an error for object that have some worng fields ', async () => {
        const response = await request(app).post('/creatPricelist/addTruckFill').send({ name: "Array of Errors", price: 6090, maxFill: 35 });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addTruckFill', { name: "pricelist1", userName: "Tony", maxFill: 35 })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

    it('should return error if the data is not correct', async () => {
        let response;
        const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
        try {
            response = await request(app).post('/creatPricelist/addTruckFill', { name: "error", o: "Avi" })
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(insert).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })
})
///////////////////////////////addPricesListBySupplierOrClient
describe('insert additions for supplier or client to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient').send({ name: "pricelist1", userName: "Avi", clientName: "Gidi" });
        expect(response.statusCode).toBe(201);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })

    it('should execute insert once', async () => {
        jest.setTimeout(async _ => {
            const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
            _ = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient').send({ name: "pricelist1", userName: "Avi", clientName: "Gidi" });
            expect(insert).toHaveBeenCalled();
        }, 6000);
    })

    it('should return an error for object that not include the must fields ', async () => {
        const response = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient').send({ name: 'error', clientName: "Gidi" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an error for object that have some worng fields ', async () => {
        const response = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient').send({ name: "Array of Errors", clientName: "Gidi" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient', { name: "pricelist1", userName: "Avi", clientName: "Gidi" })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

    it('should return error if the data is not correct', async () => {
        let response;
        const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
        try {
            response = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient', { name: "error", o: "Avi" })
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(insert).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })
})

describe('insert products to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addPricelistForProducts').send({ name: "pricelist1", userName: "Avi", clientName: "Gidi" });
        expect(response.statusCode).toBe(201);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    it('should execute insert once', async () => {
        jest.setTimeout(async _ => {
            const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
            _ = await request(app).post('/creatPricelist/addPricelistForProducts').send({ name: "pricelist1", userName: "Avi", productCode: 968 });
            expect(insert).toHaveBeenCalled();
        }, 6000);
    })

    it('should return an error for object that not include the must fields ', async () => {
        const response = await request(app).post('/creatPricelist/addPricelistForProducts').send({ name: "error", productCode: 968 });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an error for object that have some worng fields ', async () => {
        const response = await request(app).post('/creatPricelist/addPricelistForProducts').send({ name: "Array of Errors", productCode: 968});
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addPricelistForProducts', { name: "pricelist1", userName: "Avi", productCode: 968 })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

    it('should return error if the data is not correct', async () => {
        let response;
        const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
        try {
            response = await request(app).post('/creatPricelist/addPricelistForProducts', { name: "error", o: "Avi" })
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(insert).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })
})

//////////////////////////addPricelistForFinishProducts
describe('insert finish products to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addPricelistForFinishProducts').send({ name: "pricelist1", userName: "Avi", finishProductCode: 23 });
        expect(response.statusCode).toBe(201);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    it('should execute insert once ', async () => {
        jest.setTimeout(async _ => {
            const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist')
            _ = await request(app).post('/creatPricelist/addPricelistForFinishProducts', { name: "pricelist1", userName: "Avi", finishProductCode: 23 })
            expect(insert).toHaveBeenCalled();
        }, 6000);
    })

    it('should return an error for object that not include the must fields ', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addPricelistForFinishProducts', {name:"error"});
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000);
    })
    it('should return an error for object that have some worng fields ', async () => {
        const response = await request(app).post('/creatPricelist/addPricelistForFinishProducts').send({ name: "Array of Errors", userName: "Avi", finishProductCode: 23});
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        const response = await request(app).post('/creatPricelist/addPricelistForFinishProducts').send({ name: "error", userName: "Avi", finishProductCode: 23 })
        expect(response.headers['content-type'])
            .toBe("text/html; charset=utf-8")
        expect(response).toBeTruthy()
    })

    it('should return error if the data is not correct', async () => {
        let response;
        const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
        try {
            response = await request(app).post('/creatPricelist/addPricelistForFinishProducts', { name: "error", o: "Avi" })
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(insert).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })

})

describe('insert additions to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addAdditionsForPricelist').send({ name: "pricelist1", userName: "Avi" });
        expect(response.statusCode).toBe(201);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    it('should execute insert once ', async () => {
        jest.setTimeout(async _ => {
            const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist')
            _ = await request(app).post('/creatPricelist/addAdditionsForPricelist', { name: "pricelist1", userName: "Avi" })
            expect(insert).toHaveBeenCalled();
        }, 6000);
    })

    it('should return an error for object that not include the must fields ', async () => {
        const response = await request(app).post('/creatPricelist/addAdditionsForPricelist').send({ name: "error", userName: "Avi" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an error for object that have some worng fields ', async () => {
        const response = await request(app).post('/creatPricelist/addAdditionsForPricelist').send({ name: "Array of Errors", userName: "Avi"});
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addAdditionsForPricelist', { name: "pricelist1", userName: "Avi" })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

    it('should return error if the data is not correct', async () => {
        let response;
        const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
        try {
            response = await request(app).post('/creatPricelist/addAdditionsForPricelist', { name: "error", o: "Avi" })
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(insert).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })

})

// describe('insert additions to price list', () => {
//     it('shuold insert the object to db ', async () => {
//         const response = await request(app).post('/creatPricelist/addAdditionsForPricelist').send({ name: "pricelist1", userName: "Avi" });
//         expect(response.statusCode).toBe(201);
//         expect(response).toBeDefined();
//         expect(response.notFound).toBeFalsy();
//         expect(response.serverError).toBeFalsy();
//     })
//     it('should execute insert once ', async () => {
//         jest.setTimeout(async _ => {
//             const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist')
//             _ = await request(app).post('/creatPricelist/addAdditionsForPricelist', { name: "pricelist1", userName: "Avi" })
//             expect(insert).toHaveBeenCalled();
//         }, 6000);
//     })

//     it('should return an error for object that not include the must fields ', async () => {
//         jest.setTimeout(async _ => {
//             const response = await request(app).post('/creatPricelist/addAdditionsForPricelist', {});
//             expect(response).toBeDefined();
//             expect(response.statusCode).toBe(500);
//             expect(response.serverError).toBeTruthy();
//         }, 6000);
//     })

//     it('should return an answer from type text-html, and true for good request', async () => {
//         jest.setTimeout(async _ => {
//             const response = await request(app).post('/creatPricelist/addAdditionsForPricelist', { name: "pricelist1", userName: "Avi" })
//             expect(response.headers['content-type'])
//                 .toBe("text/html; charset=utf-8")
//             expect(response).toBeTruthy()
//         }, 6000);
//     })

//     it('should return error if the data is not correct', async () => {
//         let response;
//         const { insert } = jest.requireMock('../../../modules/pricelist/insertPricelist');
//         try {
//             response = await request(app).post('/creatPricelist/addPriceList', { g: "pricelist1", o: "Avi" })
//         }
//         catch (error) {
//             expect(error).toBeInstanceOf(Error);
//             expect(response).not.toBeDefined();
//             expect(insert).toHaveBeenCalled();
//             expect(error).toBeDefined();
//         }
//     })

// })

describe('get id for Pricelist Name', () => {
    it('shuold return id for price list-name ', async () => {
        jest.setTimeout(6000)
        const response = await request(app).get(`/creatPricelist/getIdForPricelistName/pricelist1`);
        expect(response.statusCode).toBe(200);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    it('should execute insert once ', async () => {
        jest.setTimeout(async _ => {
            const { getId } = jest.requireMock('../../../modules/pricelist/insertPricelist')
            _ = await request(app).get('/creatPricelist/getIdForPricelistName/pricelist1')
            expect(getId).toHaveBeenCalled();
        }, 6000);
    })
    it('should return an error for object that not include the must fields ', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).get('/creatPricelist/getIdForPricelistName/error');
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000);
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).get('/creatPricelist/getIdForPricelistName/pricelist1')
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

    it('should return error if the params wasnt send', async () => {
        jest.setTimeout(async _ => {

            let response;
            const { getId } = jest.requireMock('../../../modules/pricelist/insertPricelist');
            try {
                response = await request(app).get('/creatPricelist/getIdForPricelistName/error')
            }
            catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(response).not.toBeDefined();
                expect(getId).toHaveBeenCalled();
                expect(error).toBeDefined();
            }
        }, 6000);
    })

})

describe('details of profucts', () => {
    it('shuold return details of profucts ', async () => {
        const response = await request(app).post('/creatPricelist/detailsOfProfucts/tbl_PriceList');
        expect(response.statusCode).toBe(201);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    it('should execute getProducts once', async () => {
        jest.setTimeout(async _ => {
            const { getProducts } = jest.requireMock('../../../modules/pricelist/insertPricelist')
            _ = await request(app).post('/creatPricelist/detailsOfProfucts/tbl_PriceList')
            expect(getProducts).toHaveBeenCalled();
        }, 6000);
    })

    it('should return an error if table name wasn`t send ', async () => {
        const response = await request(app).post('/creatPricelist/detailsOfProfucts/error');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/detailsOfProfucts/tbl_PriceList')
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

    it('should return error if the data is not correct', async () => {
        let response;
        const { getProducts } = jest.requireMock('../../../modules/pricelist/insertPricelist');
        try {
            response = await request(app).post('/creatPricelist/detailsOfProfucts/error')
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(getProducts).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })
})

describe('update field in table', () => {
    it('shuold update field in a table ', async () => {
        const response = await request(app).post('/creatPricelist/updateFieldInTable/2/tbl_PriceList').send({ name: "pricelist1", userName: "Avi" });
        expect(response.statusCode).toBe(204);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    it('should execute getProducts once', async () => {
        jest.setTimeout(async _ => {
            const { updateField } = jest.requireMock('../../../modules/pricelist/insertPricelist')
            _ = await request(app).post('/creatPricelist/updateFieldInTable/2/tbl_PriceList', { name: "pricelist1", userName: "Avi" })
            expect(updateField).toHaveBeenCalled();
        }, 6000);
    })

    it('should return an error if table name wasn`t send ', async () => {
        const response = await request(app).post('/creatPricelist/updateFieldInTable/error/tbl_PriceList', { name: "pricelist1", userName: "Avi" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an error for object that have some worng fields ', async () => {
        const response = await request(app).post('/creatPricelist/updateFieldInTable/error/tbl_PriceList').send({ name: "Array of Errors", userName: "Avi"});
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/updateFieldInTable/2/tbl_PriceList', { name: "pricelist1", userName: "Avi" })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

    it('should return error if the data is not correct', async () => {
        let response;
        const { updateField } = jest.requireMock('../../../modules/pricelist/insertPricelist');
        try {
            response = await request(app).post('/creatPricelist/updateFieldInTable/error/error')
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(updateField).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })
})

describe('get Id For Buyton Describe', () => {
    it('shuold return id for buyton describe ', async () => {
        const response = await request(app).get(`/creatPricelist/getIdForBuytonDescribe/grain/tbl_BuytonGrain`);
        expect(response.statusCode).toBe(201);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    it('should execute getIdForBuytonDescribe once ', async () => {
        const { getIdForBuytonDescribe } = jest.requireMock('../../../modules/pricelist/insertPricelist')
        _ = await request(app).get('/creatPricelist/getIdForBuytonDescribe/grain/tbl_BuytonGrain')
        expect(getIdForBuytonDescribe).toHaveBeenCalled();
    })

    it('should return an error if table name wasnt send ', async () => {
        const response = await request(app).get('/creatPricelist/getIdForBuytonDescribe/error/error');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(500);
        expect(response.serverError).toBeTruthy();
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        const response = await request(app).get('/creatPricelist/getIdForBuytonDescribe/grain/tbl_BuytonGrain')
        expect(response.headers['content-type'])
            .toBe("application/json; charset=utf-8")
        expect(response).toBeTruthy()
    })

    it('should return error if the data is not correct', async () => {
        let response;
        const { getIdForBuytonDescribe } = jest.requireMock('../../../modules/pricelist/insertPricelist');
        try {
            response = await request(app).get('/creatPricelist/getIdForBuytonDescribe/error/error')
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect(response).not.toBeDefined();
            expect(getIdForBuytonDescribe).toHaveBeenCalled();
            expect(error).toBeDefined();
        }
    })

})
