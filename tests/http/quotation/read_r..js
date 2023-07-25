const request = require('supertest');
const { app } = require('../../app')

require('../../modules/quotation/read')

jest.mock('../../../modules/quotation/read', () => {
    return {
        allContactDataList: jest.fn(() => {
            return 'allContactDataList in the router test!'
        }
        )
    }
})


describe('GET ALL_CONTACT ROUTER', () => {
    it('get(`/allContactList`) in the router',async()=>{
        const response = await request(app).get('/quoatation/allContactList')
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(response.serverError).toBeFalsy();
        console.log("rrrrrrrrrrrrr");
    })

    it('get(`/`) in the router',async()=>{
        const response = await request(app).get('/quoatation/')
        expect(response.headers['content-type']).toBe('text/html; charset=utf-8')
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(response.serverError).toBeFalsy();
       
    })



})