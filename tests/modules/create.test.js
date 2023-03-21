const { insertProduct, getTraits } = require('../../modules/products')

jest.mock('../../services/')


describe('INSERT', () => {
    it('should return defined response', async () => {
        const response = await insertProduct({ traitName: "gdfgdf" });
        // expect(response).toBeDefined();
        expect(response).toBeInstanceOf(Object)

    })
    // it('should return defined response', async () => {
    //     const response = await insertProduct({});
    //     expect(response).toBeDefined();
    //     expect(response).toBeInstanceOf(Object)

    // })
    // it('should return defined response', async () => {
    //     const response = await insertProduct();
    //     expect(response).toBeDefined();
    //     expect(response).toBeInstanceOf(Object)

    // })

})
describe('FIND', () => {
    it('should return defined response', async () => {
        const response = await getTraits({ traitName: "f" });
        // expect(response).toBeDefined();
        expect(response).toBeInstanceOf(Object)
    })

})