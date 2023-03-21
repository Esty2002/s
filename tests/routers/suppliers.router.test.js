jest.mock('../../modules/suppliers', () => {
    return {
        getAllSuppliers: jest.fn(() => {
            return 'true';
        }),
        getSupplier: jest.fn((obj) => {
            if (obj.option === 'gggg' || obj.text === 'gggg') {
                throw new Error('can not getSupplier')
            }
            else {
                return { option: "aaaa", text: "kkkk" };
            }
        }),
        deleteSupplier: jest.fn((object) => {
            return object;
        })
    }
})
const request = require('supertest');
const { app } = require('../../app');
let server;

beforeAll(() => {
    server = app.listen('1530');
})

describe(('GET ALLSUPPLIER '), () => {
    it('get("/suppliers/getallSuppliers") returns an answer if get from findSupllier obj', async () => {
        const response = await request(app).get('/suppliers/getallSuppliers');
        expect(response.statusCode).toBe(200);
        expect(response.notFound).toBeFalsy();
    })

})


describe(('GETSUPPLIERS '), () => {
    it('get("/suppliers/getSuppliers/:"SuplierCode"/:12") returns an answer if get from findSupllier obj', async () => {
        const response = await request(app).get('/suppliers/getSuppliers/SuplierCode/12');
        expect(response.statusCode).toBe(200);
        expect(response.notFound).toBeFalsy();
    })
    it('should send status 500 if it is not good ', async () => {
        const response = await request(app).get('/suppliers/getSuppliers/gggg/gggg');
        expect(response).toBeDefined()
        expect(response.statusCode).toBe(500)
    })
})
describe('DELETE SUPPLIER', () => {
    it('should call deletesupplier', async () => {
        const methods = jest.requireMock('../../modules/suppliers');
        const response = await request(app).post('/suppliers/deletesupplier', { SupplierCode: "aaa", BranchName: 'jjj' });
        expect(methods.deleteSupplier).toHaveBeenCalled();
        // expect(methods.deleteSupplier).toHaveBeenCalledTimes(2);
        expect(response).toBeDefined()
    })

    it('post("/deletesupplier") is found', async () => {
        const response = await request(app).post('/suppliers/deletesupplier', { SupplierCode: "aaa", BranchName: 'jjj' });
        expect(response.statusCode).toBe(200);
        expect(response).toBeTruthy();
    })
})



afterAll(() => {
    server.close();
})
