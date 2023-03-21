jest.mock('../../modules/branches', () => {
    return {
        getallbranches: jest.fn(() => {
            return 'true';
        }),
        getBranchesWithCondition: jest.fn((condition, value) => {
            if (condition === undefined && value === undefined) {
                throw new Error('can not getBranchesWithCondition')
            }
            else {
                return { condition: "aaaa", value: "kkkk" };
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
describe('GET BRANCHES', () => {
    describe(('GET ALLBRANCHES '), () => {
        it('get("/branches/getallbranches") returns an answer if get from findBranch obj', async () => {
            const response = await request(app).get('/branches/getallbranches');
            expect(response.statusCode).toBe(200);
            expect(response.notFound).toBeFalsy();
        })
    })
    describe(('GET GETBRANCHES '), () => {
        it('get("/branches/getBranchesWithCondition/"BranchCode"/12") returns an answer if get from findBranch obj', async () => {
            const response = await request(app).get('/branches/getBranchesWithCondition/:"BranchCode"/:12');
            expect(response.statusCode).toBe(200);
            expect(response.notFound).toBeFalsy();
        })
    })
})

afterAll(() => {
    server.close();
})