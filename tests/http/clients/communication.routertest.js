// const { default: expect } = require('expect');
// const request = require('supertest');

// const { app } = require('../../../app');


// jest.mock('../../../modules/clients/communication', () => {
//     return {
//         postCommunications: jest.fn((obj) => {
//             console.log(obj);
//             if (Object.keys(obj).length==0) {
//                 return false;
//             }
//             return true;

//         })
//     }
// })


// describe('POST', () => {
//     it('shuold insret the object to db', async () => {
       
//         const res = await request(app).post('/communication/postCommunications').send({ name: "tamy", customerCode: 1000 })
//         expect(res.statusCode).toBe(200)
//         expect(res).toBeDefined()
//     })
//     it('shuold execute postCommunications tow ', async () => {
//        const {postCommunications}=jest.requireMock('../../../modules/clients/communication')
//         const res = await request(app).post('/communication/postCommunications').send({ name: "tamy", customerCode: 1000 })
//         expect(postCommunications).toHaveBeenCalled()
//         expect(postCommunications).toHaveBeenCalledTimes(2)
//     })

//     it('shuold return a json object', async () => {
        
//         const response= await request(app).post('/communication/postCommunications').send({ name: "tamy", customerCode: 1000 })
//          expect(response.headers['content-type']).toBe("application/json; charset=utf-8")
//      })

//      it('shuold return status 404 for none object', async () => {
//         const response= await request(app).post('/communication/postCommunications').send()
//         expect(response.statusCode).toBe(404)
//      })

    
    

// })
