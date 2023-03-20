const { app } = require('../../app');
const request = require('supertest');
jest.mock('../../modules/branches', () => {
    return {
        insertOneBranch: jest.fn((object) => {
            console.log(object,"objectttttttttttttttttttttttttttttttttttttt");
            if(object.SupplierCode===undefined){
                console.log('in vcvcvcvcvcvc');
                throw new Error('can not insert')
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
    describe('ADD BRANCH', () => {
        it('post("/insertbranch") is found', async () => {
            const response = await request(app).post('/branches/insertbranch').send({ SupplierCode: "aaa", BranchName: 'jjj' });
            expect(response).toBeDefined()
            expect(response.status).toBe(200);
            // expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
            expect(response).toBe({ SupplierCode: "aaa", BranchName: 'jjj' });
        })
        it('should call insertOneBranch', async () => {
            const methods = jest.requireMock('../../modules/branches');
            const response = await request(app).post('/branches/insertbranch').send({ SupplierCode: "aaa", BranchName: 'jjj' });
            expect(methods.insertOneBranch).toHaveBeenCalled();
            // expect(methods.insertOneBranch).toHaveBeenCalledTimes(1);
            expect(response).toBeDefined()
        })


        // it('should send status 500 if it is not good ', async () => {
        //     const response = await request(app).post('/branches/insertbranch').send({});
        //     expect(response).toBeDefined()
        //     expect(response.statusCode).toBe(500)
        // })

    })
})

afterAll(() => {
    server.close()
})