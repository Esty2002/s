jest.mock('../../../services-leads/db/sql/sql-operations.js', () => {
    return {
        logToFile: jest.fn((obj) => {

        }),
        checkObjectValidations: jest.fn((obj) => {

        }),
        findMeasureNumber: jest.fn((obj) => {

        }),
        postData: jest.fn((obj) => {

        }),
    }
});

const { insertFinishProduct, findFinishProduct } = require('../../../modules/products/finishProducts');
describe('function insertFinishProduct', () => {
    it('', async () => {
        const result = await insertFinishProduct({});
    })
})
