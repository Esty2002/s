
const request = require('supertest');
const { app } = require('../../app');

jest.mock('../../modules/readClient', () => {
    return {
        getAllClient: jest.fn(() => {
            return [{ id: 1, name: "Gitty", city: "Ashdod" }, { id: 2, name: "Ruty", city: "Jerusalem" }]
        }),
        getClientsById: jest.fn((id) => {
            if (id == 1)
                return { id, name: "Gitty" }
            return null
        }),
        getClientsByField: jest.fn((field, value) => {
            if (field == 'name' && value == 'Gitty')
                return { id: 1, name: "Gitty" }
            return null
        })

    }
})


describe('GET ALL CLIENTS', () => {
    it('should execute getAll 1 times', async () => {
        _ = await request(app).get('/readClient/getAll');
        const methods = jest.requireMock('../../modules/readClient');
        expect(methods.getAllClient).toHaveBeenCalled();
        expect(methods.getAllClient).toHaveBeenCalledTimes(1)
    })

    it('get ("/readClient/getAll") return an array with all the clients', async () => {
        const response = await request(app).get('/readClient/getAll')
        expect(response.statusCode).toBe(200)
        expect(response.notFound).toBeFalsy()
    })

    it('should get ("/readClient/getAll") and return a json answer', async () => {
        const response = await request(app).get('/readClient/getAll')
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
    })


})

describe('FIND CLIENT BY ID', () => {


    it('should execute getById 1 times', async () => {
        const methods = jest.requireMock('../../modules/readClient');
        _ = await request(app).get('/readClient/findClient/1');
        expect(methods.getClientsById).toHaveBeenCalled();
        expect(methods.getClientsById).toHaveBeenCalledTimes(1);
    })

    it('get ("/readClient/findClient/:id")return one client by id', async () => {
        const response = await request(app).get('/readClient/findClient/1');
        expect(response.statusCode).toBe(200);

    })

    it('get ("/readClient/findClient/:id")return one client by id', async () => {
        const response = await request(app).get('/readClient/findClient/2');
        expect(response.statusCode).toBe(404);
        expect(response.notFound).toBeTruthy()


    })
    it('should get ("/readClient/findClient/:id") and return a json answer', async () => {
        const response = await request(app).get('/readClient/findClient/1')
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
    })


})

describe('FIND CLIENT BY SPECIFIC KEY AND VALUE',()=>{
    it('should execute getClientsByField 1 times',async()=>{
        const methods = jest.requireMock('../../modules/readClient');
        _ = await request(app).get('/readClient/searchClient/name/Gitty');
        expect(methods.getClientsByField).toHaveBeenCalled();
        expect(methods.getClientsByField).toHaveBeenCalledTimes(1);
    })

    it('get ("/readClient/searchClient/:field/:value")return clients by specific keyand value ', async () => {
        const response = await request(app).get('/readClient/searchClient/name/Gitty');
        expect(response.statusCode).toBe(200);

    })

    it('get ("/readClient/findClient/:id")return one clients by specific key and value', async () => {
        const response = await request(app).get('/readClient/searchClient/name/Esty');
        expect(response.statusCode).toBe(404);
        expect(response.notFound).toBeTruthy()


    })

})
