const request = require('supertest')
const { app } = require('../../app')
jest.mock('../../modules/leads/sql/create_sql', () => {
    return {
        selectAllTable: jest.fn((tablename) => {
            return 'test'
        }),
        selectRecordByPhoneNumber: jest.fn((phone, tablename) => {
            if (phone === undefined) {
                return ({ tablename:"test" })
            }
            if (tablename === undefined) {
                return ({ phone: '0583288477' })

            }

            return ({ phone: '0583288477', tablename: 'test' })



        }),

    }
})

describe('/getalltable', () => {
    it('should get the all table whith the name wich are givven', async () => {
        const response = await request(app).get('/leads/getalltable?name=test')
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })

    it('should the request successful without sends the deteils', async () => {
        const response = await request(app).get('/leads/getalltable')
        // console.log(response,"respnse");
        expect(response).toBeDefined();
        expect(response.text).toBe('test');
        expect(response.statusCode).toBe(200);

        expect(response.serverError).toBeFalsy();
    })
})


describe('/getRowAccordingToPhone', () => {
    it('should getRowAccordingToPhone whith the deteils wich are givven', async () => {
        const response = await request(app).get('/leads/getRowAccordingToPhone?name=test?phone=0583286477')
        expect(response).toBeTruthy();
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();

    })

    it('should the request successful without sends the deteils', async () => {
        const response = await request(app).get('/leads/getRowAccordingToPhone')
        expect(response).toBeDefined();
        expect(response.text).toBe('{"tablename":"test"}');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
    })
    it('should the request successful only whith the name ', async () => {
        const response = await request(app).get('/leads/getRowAccordingToPhone?name=test')

        expect(response).toBeDefined();
        expect(response.text).toBe('{"tablename":"test"}');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response).toBeTruthy();
    })
    it('should the request successful only whith the phone ', async () => {
        const response = await request(app).get('/leads/getRowAccordingToPhone?phone=0583288477')

        expect(response).toBeDefined();
        expect(response.text).toBe('{"phone":"0583288477"}');
        expect(response.statusCode).toBe(200);
        expect(response.serverError).toBeFalsy();
        expect(response).toBeTruthy();
    })
})