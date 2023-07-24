// const request = require('supertest');
// const { app } = require('../../../app');

// jest.mock('../../../modules/clients/deleteClient', () => {
//     return {
//         deletedClientByCode: jest.fn((clientCode, userName) => {
//             if (clientCode && userName)
//                 return true;
//             return false

//         })
//     }
// })

// describe ('POST API', () => {
    
//     it('status should be 200 when delete the client from db , ' ,async() => {
//         const response = await request(app).post('/delete/deleteClient').send({code:1221,user:'gpree'});
//         expect(response).toBeDefined();
//         expect(response.statusCode).toBe(200);

//     })

//     it('status should to be 404 when not delete client' ,async() => {
//         const response = await request(app).post('/delete/deleteClient', {});
//         expect(response).toBeDefined();
//         expect(response.statusCode).toBe(404);

//     })

//     it('should send a json object' ,async() => {
//         const response = await request(app).post('/delete/deleteClient', {clientCode:1221,userName:'gpree'});
//         expect(response.headers['content-type']).toBe("application/json; charset=utf-8")

//     })

//     it('should execute deletedClientByCode once' ,async() => {
//         _ = await request(app).post('/delete/deleteClient').send({code:1221,user:'gpree'});
//         const {deletedClientByCode}=jest.requireMock('../../../modules/clients/deleteClient');
//         expect(deletedClientByCode).toHaveBeenCalled();

//     })

// })
