const request = require('supertest')
const { app } = require('../../../app')

jest.mock('../../../modules/leads/create_m', () => {
    return {
        createNewLead: jest.fn((obj) => {
            return '123456'
        })
    }
})

describe('/createnewlead', () => {

    it('should create a new lead with the details wich are givven', async () => {
        const response = await request(app).post('/leads/createnewlead', { "name": 'test' })
        expect(response).toBeTruthy()
        expect(response.statusCode).toBe(200)
    })

    it('should call createNewLead', async () => {
        const { createNewLead } = jest.requireMock('../../../modules/leads/create_m')
        const response = await request(app).post('/leads/createnewlead', { "name": 'test' })
        expect(createNewLead).toHaveBeenCalled()
        expect(response).toBeDefined()
        expect(response.text).toBe('123456');
    })
    
})