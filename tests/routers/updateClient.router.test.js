const request = require('supertest');
const { app } = require('../../app')

jest.mock('../../modules/updateClient', () => {
    return {
        updateClient: jest.fn((obj) => {
            if (obj)
                return true;
            return false;
        })
    }
})
describe('POST API', () => {
    it('should update the data in the db', async () => {
        const response = await request(app).post('/updateClient/update', { clientCode: '123', clientName: 'Gidon' })
        expect(response).toBeDefined();
        expect(response.statusCode).toBe(200);
    })

    it('should execute updateClient once ', async () => {
        const { updateClient } = jest.requireMock('../../modules/updateClient')
        _ = await request(app).post('/updateClient/update', { clientCode: '123', clientName: 'Gidon' })
        expect(updateClient).toHaveBeenCalled();
        expect(updateClient).toHaveBeenCalledTimes(2);
    })

    it('should return a json object', async () => {
        const response = await request(app).post('/updateClient/update', { clientCode: '123', clientName: 'Gidon' })
        expect(response.headers['content-type'])
        .toBe("application/json; charset=utf-8")

    })
})