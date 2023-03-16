const { findProductByName, updateProduct } = require('../../modules/products')

jest.mock('../../modules/products', () => {
    return {
        updateProduct: jest.fn((obj) => {
            return {};
        }),
        findProductByName: jest.fn((name) => {
            return { name: name }
        })
    }
})

describe('FIND', () => {
    it('should return defined response', async () => {
        const response = await findProductByName("racheli");
        expect(response).toBeDefined();
    })

    it('should execute findOne twice', async () => {
        _ = await findProductByName("racheli");
        const methods = jest.requireMock('../../modules/products');
        expect(methods.findProductByName).toHaveBeenCalled();
        expect(methods.findProductByName).toHaveBeenCalledTimes(2);
    })
})
describe('UPDATE', () => {
    it('should return defined response', async () => {
        const response = await updateProduct("tovi", { name: "rut" });
        expect(response).toBeDefined();
    })
    
    it('should execute updateOne twice', async () => {
        _ = await updateProduct({ name: "tovi" }, { name: "rut" });
        const methods = jest.requireMock('../../modules/products');
        expect(methods.updateProduct).toHaveBeenCalled();
        expect(methods.updateProduct).toHaveBeenCalledTimes(2);
    })
})