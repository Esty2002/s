
jest.mock('../../modules/suppliers', () => {
    return {
        getAllSuppliers: jest.fn(() => {
            return 'true';
        }),
        getSupplier: jest.fn((option, text) => {
            if (option === undefined && text === undefined) {
                throw new Error('can not getSupplier')
            }
            else {
                return { option: "aaaa", text: "kkkk" };
            }
        })
    }
})
const request = require('supertest');
const { app } = require('../../app');
let server;

beforeAll(() => {
    server = app.listen('1500');
})

describe('GET SUPPLIERS', () => {
    describe(('GET ALLSUPPLIER '), () => {
        it('get("/suppliers/getallSuppliers") returns an answer if get from findSupllier obj', async () => {
            const response = await request(app).get('/suppliers/getallSuppliers');
            expect(response.statusCode).toBe(200);
            expect(response.notFound).toBeFalsy();
        })
    })
    describe(('GET GETSUPPLIERS '), () => {
        it('get("/suppliers/getSuppliers/:"SuplierCode"/:12") returns an answer if get from findSupllier obj', async () => {
            const response = await request(app).get('/suppliers/getSuppliers/:"SuplierCode"/:12');
            expect(response.statusCode).toBe(200);
            expect(response.notFound).toBeFalsy();
        })
    })
})

afterAll(() => {
    server.close();
})