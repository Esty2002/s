const request = require('supertest')
const { app } = require('../../app')

jest.mock('../../modules/leads/mongo/create_m', () => {
    return {
        createNewLead: jest.fn((obj) => {
            return '123456'
        })

    }
})
jest.mock('../../modules/leads/sql/create_sql', () => {
    return {
        newOrderer: jest.fn((obj=null) => {
            return 'insert'
        }),
        newPouringType:jest.fn((obj =null)=>{
            return 'insertType'
        })
    }
})

describe('/createnewlead', () => {

    it('should create a new lead with the details wich are givven', async () => {

        const response = await request(app).post('/leads/createnewlead', { "name": "test" })
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should call createNewLead', async () => {
        const { createNewLead } = jest.requireMock('../../modules/leads/mongo/create_m.js')
        const response = await request(app).post('/leads/createnewlead', { "name": "test" })
        expect(createNewLead).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('123456');

    })
    it('should the request good without parmeters sended ', async () => {
        const response = await request(app).post('/leads/createnewlead');
        expect(response).toBeDefined();
        expect(response.text).toBe('123456');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();


    })

})
describe('check the function /neworderer', () => {
    it("should return that the function come to the path", async () => {
        const response = await request(app).post('/leads/neworderer', { name: "test", phone: "0527645487" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe('insert');

    })
    it("should return that the function come to the path even the arguments not recived",async()=>{
        const response = await request(app).post('/leads/neworderer');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe('insert');
    })
    it("should return that the function come to the path even the arguments not recived",async()=>{
        const response = await request(app).post('/leads/neworderer',{name:"test"});
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response.text).toBe('insert');
    })
})
describe('check function newpouringtype',()=>{
    it('should return the function insert if the arguments is exist ',async()=>{
        const response = await request(app).post('/leads/newpouringtype' ,{name:"byton"});
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200)
        expect(response.serverError).toBeFalsy()
        expect(response.text).toBe('insertType');

    })

    it('should return the function insert if the arguments is not exist ',async()=>{
        const response = await request(app).post('/leads/newpouringtype');
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200)
        expect(response.serverError).toBeFalsy()
        expect(response.text).toBe('insertType');

    })

    it('should return the function insert if the arguments is not empty ',async()=>{
        const response = await request(app).post('/leads/newpouringtype' ,{});
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200)
        expect(response.serverError).toBeFalsy()
        expect(response.text).toBe('insertType');

    })
})