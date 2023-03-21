//test to deleteSupplier

jest.mock('../../modules/suppliers', () => {
    return {
        deleteSupplier: jest.fn((object) => {
            return object;
        })
    }
})

const { app } = require('../../app');
const request = require('supertest')

let server;

beforeAll(() => {
    server = app.listen('1122')
})
describe('POST API', () => {
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
})
afterAll(() => {
    server.close()
})




