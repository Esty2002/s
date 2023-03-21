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
        getBranchesWithCondition: jest.fn((condition, value) => {
            if (condition === undefined && value === undefined) {
                throw new Error('can not getBranchesWithCondition')
            }
            else {
                return { condition: "aaaa", value: "kkkk" };
            }
        }),
        updateDetail:jest.fn((code,object)=>{
            console.log(code);
            console.log(object);
            if(object.BranchName===undefined){
                throw new Error('can not update')
            }
            else
                return object;
        }),
        checkUnique:jest.fn((object)=>{
            if(object.BranchName==='yyy'){
                throw new Error('can not check')
            }
            else
                return object;
        })
    }
})


let server;

beforeAll(() => {
    server = app.listen('1500')
})

describe('POST API', () => {
    describe('INSERT BRANCH', () => {
        it('post("/insertbranch") is found', async () => {
            const response = await request(app).post('/branches/insertbranch').send({ SupplierCode: "aaa", BranchName: 'jjj' });
            expect(response).toBeDefined()
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        })
        it('should call insertOneBranch', async () => {
            const methods = jest.requireMock('../../modules/branches');
            const response = await request(app).post('/branches/insertbranch').send({ SupplierCode: "aaa", BranchName: 'jjj' });
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

    describe('UPDATE BRANCH', () => {
        it('post("/updatebranch") is found', async () => {
            const response = await request(app).post('/branches/updatebranch').send({BranchName: 'jjj' ,SupplierCode:123});
            expect(response).toBeDefined()
            expect(response.status).toBe(200);
        })
        it('should call updateDetail', async () => {
            const methods = jest.requireMock('../../modules/branches');
            const response = await request(app).post('/branches/updatebranch').send({ BranchName: 'jjj',SupplierCode:123});
            expect(methods.updateDetail).toHaveBeenCalled();
            expect(methods.updateDetail).toHaveBeenCalledTimes(2);
            expect(response).toBeDefined()
        })
        it('should send status 500 if it is not good ', async () => {
            const response = await request(app).post('/branches/updatebranch').send({});
            expect(response).toBeDefined()
            expect(response.statusCode).toBe(500)
        })
    })
})

describe('GET API', () => {
    describe('CHECK UNIQUE BRANCH NAME', () => {
        it('get("/checkUnique/:supplierCode/:branchname") is found', async () => {
            const response = await request(app).get('/branches/checkUnique/123/aaa');
            expect(response).toBeDefined()
            console.log(response);
            expect(response.status).toBe(200);
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        })
        it('should call insertOneBranch', async () => {
            const methods = jest.requireMock('../../modules/branches');
            const response = await request(app).get('/branches/checkUnique/123/aaa');
            expect(methods.checkUnique).toHaveBeenCalled();
            expect(methods.checkUnique).toHaveBeenCalledTimes(2);
            expect(response).toBeDefined()
        })
        it('should send status 500 if it is not good ', async () => {
            const response = await request(app).get('/branches/checkUnique/123/yyy');
            expect(response).toBeDefined()
            expect(response.statusCode).toBe(500)
        })
        
    })
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
