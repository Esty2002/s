const { app } = require('../../app');
const request = require('supertest');
jest.mock('../../modules/branches', () => {
    return {
        insertOneBranch: jest.fn((object) => {
            if(object.SupplierCode===undefined){
                throw new Error('can not insert')
            }
            else
                return object;
        }),
        getAllBranches: jest.fn(() => {
            return 'true';
        }),
        getBranchesByCondition: jest.fn((condition, value) => {
            if (condition === undefined && value === undefined) {
                throw new Error('can not getBranchesByCondition')
            }
            else {
                return { condition: "aaaa", value: "kkkk" };
            }
        }),
        deleteBranches:jest.fn((object) => {
            return object;
        })
    }
})


let server;

beforeAll(() => {
    server = app.listen('1500')
})

describe('POST API', () => {
    describe('ADD BRANCH', () => {
        it('post("/insertbranch") is found', async () => {
            const response = await request(app).post('/branches/insertbranch').send({ SupplierCode: 'aaa', BranchName: 'jjj' });
            expect(response).toBeDefined()
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        })
        it('should call insertOneBranch', async () => {
            const methods = jest.requireMock('../../modules/branches');
            const response = await request(app).post('/branches/insertbranch').send({ SupplierCode: 'aaa', BranchName: 'jjj' });
            expect(methods.insertOneBranch).toHaveBeenCalled();
            expect(methods.insertOneBranch).toHaveBeenCalledTimes(2);
            expect(response).toBeDefined()
        })


        it('should send status 500 if it is not good ', async () => {
            const response = await request(app).post('/branches/insertbranch').send({});
            expect(response).toBeDefined()
            expect(response.statusCode).toBe(500)
        })

    })

    describe('DELETE BRANCH', () => {
        it('should call deleteBranches', async () => {
            const methods = jest.requireMock('../../modules/branches');
            const response = await request(app).post('/branches/deleteBranches', { SupplierCode: "aaa", BranchName: 'jjj' });
            expect(methods.deleteBranches).toHaveBeenCalled();
            // expect(methods.insertOneBranch).toHaveBeenCalledTimes(1);
            expect(response).toBeDefined()
        })

        it('post("/deleteBranches") is found', async () => {
            const response = await request(app).post('/branches/deleteBranches', { SupplierCode: "aaa", BranchName: 'jjj' });
            expect(response.statusCode).toBe(200);
            expect(response).toBeTruthy();
        })
    })
})

describe('GET API', () => {
    describe(('GET ALLBRANCHES '), () => {
        it('get("/branches/getallbranches") returns an answer if get from findBranch obj', async () => {
            const response = await request(app).get('/branches/getallbranches');
            expect(response.statusCode).toBe(200);
            expect(response.notFound).toBeFalsy();
        })
    })

    describe(('GET GETBRANCHES '), () => {
        it('get("/branches/getBranchesWithCondition/BranchCode/12") returns an answer if get from findBranch obj', async () => {
            const response = await request(app).get('/branches/getBranchesWithCondition/BranchCode/12');
            expect(response.statusCode).toBe(200);
            expect(response.notFound).toBeFalsy();
        })
    })
})

afterAll(() => {
    server.close()
})
