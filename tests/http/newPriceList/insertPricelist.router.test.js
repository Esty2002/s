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
        }),

        getId: jest.fn((name, tbname) => {
            console.log(name, tbname);
            if (name && tbname)
                return true
            else
                throw new Error('you didnt insert name of pricelist or preffer table name')
        }),
        getProducts: jest.fn((tbname) => {
            if (tbname)
                return true;
            else
                throw new Error('you didnt insert name of preffer table name')

        }),
        updateField: jest.fn((id,tbname)=>{
            if (id && tbname)
                return true;
            else
                throw new Error('you didnt send id or name of preffer table name')
        }),
        getIdForBuytonDescribe:jest.fn((name,tbname)=>{
            console.log(name,tbname,' yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
            if (name && tbname)
                return true;
            else
                throw new Error('you didnt send name or name of preffer table name')
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
        const response = await request(app).post('/creatPricelist/addTruckFill').send({ name: "pricelist1", userName: "Tony", price: 3000 });
        expect(response.statusCode).toBe(200);
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
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addTruckFill', { name: "pricelist1", price: 6090, maxFill: 35 });
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000);
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addTruckFill', { name: "pricelist1", userName: "Tony", maxFill: 35 })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })
})

/////////////////////////////////addPricesListBySupplierOrClient
describe('insert additions for supplier or client to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient').send({ name: "pricelist1", userName: "Avi", clientName: "Gidi" });
        expect(response.statusCode).toBe(200);
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
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient', { clientName: "Gidi" });
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000);
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient', { name: "pricelist1", userName: "Avi", clientName: "Gidi" })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);

    })
})

describe('insert products to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addPricelistForProducts').send({ name: "pricelist1", userName: "Avi", clientName: "Gidi" });
        expect(response.statusCode).toBe(200);
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
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addPricelistForProducts', { productCode: 968 });
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000);
    })
    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addPricelistForProducts', { name: "pricelist1", userName: "Avi", productCode: 968 })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })
})

////////////////////////////addPricelistForFinishProducts
describe('insert finish products to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addPricelistForFinishProducts').send({ name: "pricelist1", userName: "Avi", finishProductCode: 23 });
        expect(response.statusCode).toBe(200);
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
            const response = await request(app).post('/creatPricelist/addPricelistForFinishProducts', {});
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000);
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addPricelistForFinishProducts', { name: "pricelist1", userName: "Avi", finishProductCode: 23 })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

})

describe('insert additions to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addAdditionsForPricelist').send({ name: "pricelist1", userName: "Avi" });
        expect(response.statusCode).toBe(200);
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
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addAdditionsForPricelist', {});
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000);
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addAdditionsForPricelist', { name: "pricelist1", userName: "Avi" })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

})

describe('insert additions to price list', () => {
    it('shuold insert the object to db ', async () => {
        const response = await request(app).post('/creatPricelist/addAdditionsForPricelist').send({ name: "pricelist1", userName: "Avi" });
        expect(response.statusCode).toBe(200);
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
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addAdditionsForPricelist', {});
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000);
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/addAdditionsForPricelist', { name: "pricelist1", userName: "Avi" })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

})

describe('get id for Pricelist Name', () => {
    it('shuold return id for price list-name ', async () => {
        const response = await request(app).get(`/creatPricelist/getIdForPricelistName/${'pricelist1'}/${'tbl_PriceList'}`);
        expect(response.statusCode).toBe(200);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    it('should execute insert once ', async () => {
        jest.setTimeout(async _ => {
            const { getId } = jest.requireMock('../../../modules/pricelist/insertPricelist')
            _ = await request(app).get('/creatPricelist/getIdForPricelistName/pricelist1/tbl_PriceList')
            expect(getId).toHaveBeenCalled();
        }, 6000);
    })

    it('should return an error for object that not include the must fields ', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).get('/creatPricelist/getIdForPricelistName/pricelist1/tbl_PriceList');
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000);
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/getIdForPricelistName/pricelist1/tbl_PriceList')
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

})

describe('details of profucts', () => {
    it('shuold return details of profucts ', async () => {
        const response = await request(app).post('/creatPricelist/detailsOfProfucts/tbl_PriceList');
        expect(response.statusCode).toBe(200);
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
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/detailsOfProfucts');
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000);
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/detailsOfProfucts/tbl_PriceList')
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })
})

describe('update field in table', () => {
    it('shuold update field in a table ', async () => {
        const response = await request(app).post('/creatPricelist/updateFieldInTable/2/tbl_PriceList', { name: "pricelist1", userName: "Avi" });
        expect(response.statusCode).toBe(200);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    })
    it('should execute getProducts once', async () => {
        jest.setTimeout(async _ => {
            const { getProducts } = jest.requireMock('../../../modules/pricelist/insertPricelist')
            _ = await request(app).post('/creatPricelist/updateFieldInTable/2/tbl_PriceList', { name: "pricelist1", userName: "Avi" })
            expect(getProducts).toHaveBeenCalled();
        }, 6000);
    })

    it('should return an error if table name wasn`t send ', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/updateFieldInTable/2', { name: "pricelist1", userName: "Avi" });
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000);
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/updateFieldInTable/2/tbl_PriceList', { name: "pricelist1", userName: "Avi" })
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })
})

describe('get Id For Buyton Describe', () => {
    it('shuold return id for buyton describe ', async () => {
        jest.setTimeout(async _ => {
        const response = await request(app).get(`/creatPricelist/getIdForBuytonDescribe/grain/tbl_BuytonGrain`);
        expect(response.statusCode).toBe(200);
        expect(response).toBeDefined();
        expect(response.notFound).toBeFalsy();
        expect(response.serverError).toBeFalsy();
    }, 6000);
    })
    it('should execute getIdForBuytonDescribe once ', async () => {
        jest.setTimeout(async _ => {
            const { getIdForBuytonDescribe } = jest.requireMock('../../../modules/pricelist/insertPricelist')
            _ = await request(app).get('/creatPricelist/getIdForBuytonDescribe/grain/tbl_BuytonGrain')
            expect(getIdForBuytonDescribe).toHaveBeenCalled();
        }, 6000);
    })

    it('should return an error if table name wasnt send ', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).get('/creatPricelist/getIdForBuytonDescribe/grain');
            expect(response).toBeDefined();
            expect(response.statusCode).toBe(500);
            expect(response.serverError).toBeTruthy();
        }, 6000);
    })

    it('should return an answer from type text-html, and true for good request', async () => {
        jest.setTimeout(async _ => {
            const response = await request(app).post('/creatPricelist/getIdForBuytonDescribe/grain/tbl_BuytonGrain')
            expect(response.headers['content-type'])
                .toBe("text/html; charset=utf-8")
            expect(response).toBeTruthy()
        }, 6000);
    })

})