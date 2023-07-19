const request = require('supertest');
const { app } = require('../../../app');


jest.mock('../../../services/validations/use-validations', () => {
    return {
        checkObjectValidations: jest.fn((obj) => {
            // console.log(obj," =object========");
            if(obj=={}){
                // console.log(obj, "kkkkkkkkkkkkkkkkkkkkkk");
            }
            else{
                // console.log(obj," undefined");
            }
            return obj
        })
    }
})
jest.mock('../../../modules/clients/createClient', () => {
    return {
        addOneClient: jest.fn((obj) => {
            if (obj=={} ) {
                // console.log(obj, "ew");
            }
            else {
                // console.log(obj, "uuuuuuuuuuuuuuuu");
            }
            return obj
        })
    }
})
describe('POST API', () => {
    it('status should be 200 when delete the client from db , ', async () => {
        const response = await request(app).post('/createClient/add').send({ g: "hhhhh" });
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(201);
    })

    it('status should be 200 when delete the client from db , ', async () => {
        const response = await request(app).post('/createClient/add').send({null:null});
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(201);
    })

    it('should execute deletedClientByCode once', async () => {
       const response = await request(app).post('/createClient/add').send({ ClientCode: 1221, name: "yuti" });
        const { addOneClient } = jest.requireMock('../../../modules/clients/createClient');
        expect(addOneClient).toBeCalledTimes(3);
        expect(response.statusCode).toBe(201);
    })

    // it('donst get something', async () => {
    //     const response = await request(app).post('/createClient/add')
    //     const { addOneClient } = jest.requireMock('../../../modules/clients/createClient');
    //     expect(addOneClient).toBeCalled()
    //     expect(response.statusCode).toBe(201);
    // })
    
    it('donst get something', async () => {
        const response = await request(app).post('/createClient/add').send({})
        const { addOneClient } = jest.requireMock('../../../modules/clients/createClient');
        expect(addOneClient).toBeCalled()
        expect(response.statusCode).toBe(201);
    })
    // it('donst get something', async () => {
    //     const response = await request(app).post('/createClient/add').send("4")
    //     const { addOneClient } = jest.requireMock('../../../modules/clients/createClient');
    //     expect(addOneClient).toBeCalled()
    //     expect(response.statusCode).toBe(201);
    // })
    // it('should execute deletedClientByCode once', async () => {
    //     const {checkObjectValidations} = await request(app).post('/createClient/add').send({ ClientCode: 1221, name: "yuti" });
    //     _= jest.requireMock('../../../modules/clients/createClient');
    //     // expect(checkObjectValidations).toBeCalled()
    //     // expect(checkObjectValidations).toHaveBeenCalled();
    //     expect(checkObjectValidations).toBeCalledTimes(2);
    //     expect(response.statusCode).toBe(201);
    // })
})
