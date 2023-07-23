// const request = require('supertest');
// const { app } = require('../../app')



// // const { insert} = require('../../modules/pricelist/insertPricelist')
// jest.mock('../../modules/pricelist/insertPricelist', () => {
//     return {
//         insert: jest.fn((obj) => {
//             console.log({ obj })
//             if (Object.keys(obj).length == 0)
//                 return false;

//             return true;
//         })
//     }
// })


    
// describe('POST',()=>{
//     it('shuold insret the object to db', async () => {
//         const res = await request(app).post('/creatPricelist/addPriceList').send({ name: "tamy", customerCode: 1000 })
//         expect(res.statusCode).toBe(200)
//         expect(res).toBeDefined()
//     })


//     it('should execute insert once ', async () => {
//         const { insert } = jest.requireMock('../../modules/pricelist/insertPricelist')
//         _ = await request(app).post('/creatPricelist/addPriceList', { clientCode: '123', clientName: 'Gidon' })
//         expect(insert).toHaveBeenCalled();
//         expect(insert).toHaveBeenCalledTimes(2);
//     })

//     it('should return a json object', async () => {
//         const response = await request(app).post('/creatPricelist/addPriceList', { clientCode: '123', clientName: 'Gidon' })
//         expect(response.headers['content-type'])
//         .toBe("application/json; charset=utf-8")

//     })
//     ///////////////////addCitiesAdditions

//     it('shuold insert the object to db', async () => {
//         const res = await request(app).post('/creatPricelist/addCitiesAdditions').send({ name: "tamy", customerCode: 1000 })
//         expect(res.statusCode).toBe(200)
//         expect(res).toBeDefined()
//     })


//     it('should execute insert once ', async () => {
//         const { insert } = jest.requireMock('../../modules/pricelist/insertPricelist')
//         _ = await request(app).post('/creatPricelist/addCitiesAdditions', { clientCode: '123', clientName: 'Gidon' })
//         expect(insert).toHaveBeenCalled();
//         expect(insert).toHaveBeenCalledTimes(5);
//     })

//     it('should return a json object', async () => {
//         const response = await request(app).post('/creatPricelist/addCitiesAdditions', { clientCode: '123', clientName: 'Gidon' })
//         expect(response.headers['content-type'])
//         .toBe("application/json; charset=utf-8")

//     })

//     /////////////////////////////////////////////////addTimeAdditions
//     it('shuold insert the object to db', async () => {
//         const res = await request(app).post('/creatPricelist/addTimeAdditions').send({ name: "tamy", customerCode: 1000 })
//         expect(res.statusCode).toBe(200)
//         expect(res).toBeDefined()
//     })


//     it('should execute insert once ', async () => {
//         const { insert } = jest.requireMock('../../modules/pricelist/insertPricelist')
//         _ = await request(app).post('/creatPricelist/addTimeAdditions', { clientCode: '123', clientName: 'Gidon' })
//         expect(insert).toHaveBeenCalled();
//         expect(insert).toHaveBeenCalledTimes(8);
//     })

//     it('should return a json object', async () => {
//         const response = await request(app).post('/creatPricelist/addTimeAdditions', { clientCode: '123', clientName: 'Gidon' })
//         expect(response.headers['content-type'])
//         .toBe("application/json; charset=utf-8")

//     })

//     ///////////////////////////////////////addAdditionsForDistance
//     it('shuold insert the object to db', async () => {
//         const res = await request(app).post('/creatPricelist/addAdditionsForDistance').send({ name: "tamy", customerCode: 1000 })
//         expect(res.statusCode).toBe(200)
//         expect(res).toBeDefined()
//     })


//     it('should execute insert once ', async () => {
//         const { insert } = jest.requireMock('../../modules/pricelist/insertPricelist')
//         _ = await request(app).post('/creatPricelist/addAdditionsForDistance', { clientCode: '123', clientName: 'Gidon' })
//         expect(insert).toHaveBeenCalled();
//         expect(insert).toHaveBeenCalledTimes(11);
//     })

//     it('should return a json object', async () => {
//         const response = await request(app).post('/creatPricelist/addAdditionsForDistance', { clientCode: '123', clientName: 'Gidon' })
//         expect(response.headers['content-type'])
//         .toBe("application/json; charset=utf-8")

//     })

//     ////////////////////////////////addTruckFill
//     it('shuold insert the object to db', async () => {
//         const res = await request(app).post('/creatPricelist/addTruckFill').send({ name: "tamy", customerCode: 1000 })
//         expect(res.statusCode).toBe(200)
//         expect(res).toBeDefined()
//     })


//     it('should execute insert once ', async () => {
//         const { insert } = jest.requireMock('../../modules/pricelist/insertPricelist')
//         _ = await request(app).post('/creatPricelist/addTruckFill', { clientCode: '123', clientName: 'Gidon' })
//         expect(insert).toHaveBeenCalled();
//         expect(insert).toHaveBeenCalledTimes(14);
//     })

//     it('should return a json object', async () => {
//         const response = await request(app).post('/creatPricelist/addTruckFill', { clientCode: '123', clientName: 'Gidon' })
//         expect(response.headers['content-type'])
//         .toBe("application/json; charset=utf-8")

//     })
//     //////////////////////////////////
//      ////////////////////////////////addPricesListBySupplierOrClient
//      it('shuold insert the object to db', async () => {
//         const res = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient').send({ name: "tamy", customerCode: 1000 })
//         expect(res.statusCode).toBe(200)
//         expect(res).toBeDefined()
//     })


//     it('should execute insert once ', async () => {
//         const { insert } = jest.requireMock('../../modules/pricelist/insertPricelist')
//         _ = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient', { clientCode: '123', clientName: 'Gidon' })
//         expect(insert).toHaveBeenCalled();
//         expect(insert).toHaveBeenCalledTimes(17);
//     })

//     it('should return a json object', async () => {
//         const response = await request(app).post('/creatPricelist/addPricesListBySupplierOrClient', { clientCode: '123', clientName: 'Gidon' })
//         expect(response.headers['content-type'])
//         .toBe("application/json; charset=utf-8")

//     })

//     //////////////////////////////////////addPricelistForProducts
//     it('shuold insert the object to db', async () => {
//         const res = await request(app).post('/creatPricelist/addPricelistForProducts').send({ name: "tamy", customerCode: 1000 })
//         expect(res.statusCode).toBe(200)
//         expect(res).toBeDefined()
//     })


//     it('should execute insert once ', async () => {
//         const { insert } = jest.requireMock('../../modules/pricelist/insertPricelist')
//         _ = await request(app).post('/creatPricelist/addPricelistForProducts', { clientCode: '123', clientName: 'Gidon' })
//         expect(insert).toHaveBeenCalled();
//         expect(insert).toHaveBeenCalledTimes(20);
//     })

//     it('should return a json object', async () => {
//         const response = await request(app).post('/creatPricelist/addPricelistForProducts', { clientCode: '123', clientName: 'Gidon' })
//         expect(response.headers['content-type'])
//         .toBe("application/json; charset=utf-8")

//     })
// })    