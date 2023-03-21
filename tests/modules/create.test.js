const { insertProduct, findObject } = require('../../modules/products')

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
        const response = await findObject({ traitName: "f" });
        // expect(response).toBeDefined();
        expect(response).toBeInstanceOf(Object)
    })

})