const request = require('supertest');
const { app } = require('../../../app');

jest.mock('../../../modules/clients/createClient', () => {
    return {
        addOneClient: jest.fn((obj) => {
            console.log({obj})
            if (obj.name == 'error') {
                throw new Error({ status: 500 })
            }
            if (obj.name == 'invalid status') {
                return { status: 500 }
            }
            return { status: 201 }
        })
    }
})

jest.mock('../../../services/validations/use-validations', ()=>{
    return {
        checkObjectValidations:jest.fn(()=>true)
    }
})

describe('POST API', () => {
    it('status should be 201 when response return good', async () => {
        const response = await request(app).post('/createClient/add').send({ g: "hhhhh" });
        expect(response).toBeDefined();
        console.log({response})
        expect(response.statusCode).toBe(201);
    })

    it('status should be 500 when response return but not good', async () => {
        let response;
        try {
            response = await request(app).post('/createClient/add').send({ name: "error" });
        }
        catch (error) {
            expect(error).toBeDefined()
            expect(error).toBeInstanceOf(Error)
            expect(response.statusCode).toBe(500);
        }
    })

    it('status should be 500 when response return with name error, ', async () => {
        let response;
        response = await request(app).post('/createClient/add').send({ name: "error" });
        expect(response.statusCode).toBe(500);
    })

    it('status should be 500 when response return with name invalid status, ', async () => {
        let response;
        response = await request(app).post('/createClient/add').send({ name: "invalid status" });
        expect(response.statusCode).toBe(500);
    })
})
